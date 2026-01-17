# KOI_SEO – Conductor Runbook (Checkliste)

## Quick Start

- Main: `/Users/lucaingenbleek/Documents/KOI_SEO/astro-landing-page-v1` (branch `main`)
- Conductor: `/Users/lucaingenbleek/conductor/workspaces/astro-landing-page-v1/<workspace>` (feature branches)

## Related

- [Workflow & Branching Plan (2 Wochen)](WORKFLOW_BRANCHING_PLAN.md)

## 0) Grundregel (damit nichts durcheinander kommt)

- **Main-Worktree (dein “Truth”):**
  `/Users/lucaingenbleek/Documents/KOI_SEO/astro-landing-page-v1` → Branch **`main`**
- **Conductor-Worktree(s) (parallel arbeiten):**
  `/Users/lucaingenbleek/conductor/workspaces/astro-landing-page-v1/<workspace>` → **Feature-Branch** (z. B. `Miiischwald/proj-git-setup`)

**Nie versuchen, `main` in Conductor auszuchecken**, solange `main` lokal bereits ausgecheckt ist (Worktree-Regel).

## 1) Daily Start (Main lokal, 30 Sekunden)

```bash
cd /Users/lucaingenbleek/Documents/KOI_SEO/astro-landing-page-v1
git status -sb
git pull --rebase
```

Wenn du lokal auf `main` arbeitest, pushst du auch von hier:

```bash
git push
```

## 2) Conductor Start (jeder Workspace)

### 2.1 In den Workspace gehen und sauber syncen

```bash
cd /Users/lucaingenbleek/conductor/workspaces/astro-landing-page-v1/<workspace>
git status -sb
git pull --rebase
```

### 2.2 Branch-Regel in Conductor

- 1 Workspace = 1 Aufgabe = 1 Branch
- Branch-Naming (empfohlen, konsistent):
  - `feat/naturraum-routing`
  - `feat/naturraeume-seed-14`
  - `feat/components-landing`
  - `content/spreewald-copy`
  - `seo/brandenburg-hub`

Neuen Branch anlegen:

```bash
git switch -c feat/<kurzer-name>
```

Push (dank `push.autoSetupRemote=true` reicht meist):

```bash
git push
```

## 3) “No-Merge-Conflicts” Arbeitsregeln (wichtig für Parallelisierung)

Conductor-Workspaces dürfen NUR ändern:

- `src/data/naturraeume/<id>.json`
- optional: `src/content/blog/*` (mit `naturraum_id`)
- optional: `src/assets/naturraeume/<id>/*`

Main/Architektur-Änderungen (Routing, Schema, Loader, Komponenten) nur:

- in genau einem Feature-Branch (z. B. `feat/naturraum-routing`)
- oder direkt in `main` im lokalen Worktree, wenn du alleine arbeitest.

## 4) Standard-Commit-/Push-Flow (Conductor)

Nach Änderungen:

```bash
git add -A
git commit -m "koi-seo: <kurzer sinnvoller commit>"
git push
```

## 5) PR-Flow (Feature → main)

Wenn Branch fertig:

```bash
gh pr create --base main --head <dein-branch-name>
```

Optional (Updates reinziehen, bevor du final mergst):

```bash
git fetch origin
git rebase origin/main
git push --force-with-lease
```

Hinweis: `--force-with-lease` nur, wenn du `rebase` gemacht hast.

## 6) Quick Health Checks (wenn “komisch”)

Wo bin ich? Welcher Branch?

```bash
pwd
git status -sb
git branch -vv
```

Welche Worktrees existieren?

```bash
git worktree list
```

Remote korrekt?

```bash
git remote -v
```

GitHub Login / Rechte

```bash
gh auth status
gh repo view Miiischwald/KOI_SEO --json viewerPermission,defaultBranchRef
```

## 7) Empfohlene Conductor Task-Vorlage (kurz, konfliktarm)

Task: Arbeite nur an Naturraum `{{ID}}`.

Erlaubte Dateien:

- `src/data/naturraeume/{{ID}}.json`
- optional: `src/content/blog/*` (Frontmatter: `naturraum_id={{ID}}`)
- optional: `src/assets/naturraeume/{{ID}}/*`

Regeln:

- keine Änderungen an Routing/Komponenten
- JSON muss schema-konform sein (6 Features, 3–6 Projekte, SEO-Längen)
- am Ende: `npm run ci` ausführen und Ergebnis posten

## 8) Empfohlene “Startreihenfolge” für KOI_SEO (damit es schnell live geht)

1. `feat/naturraum-routing` (1 Workspace oder lokal)
   - Dynamic route + loader + schema + hub page + validator + `npm run ci` grün
2. `feat/naturraeume-seed-14` (Conductor parallel)
   - 14 JSON Core-Datensätze erzeugen
3. `content/` Branches pro Naturraum (Conductor parallel)
   - pro Naturraum 1 Blogpost + interne Links
