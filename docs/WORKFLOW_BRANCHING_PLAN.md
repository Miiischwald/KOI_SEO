# KOI_SEO – Workflow & Branching Plan (2 Wochen)

## Empfehlung (für das Ziel 14 → hunderte Landingpages)

**Architektur in Feature-Branches (PR-basiert), Content parallel in Conductor-Branches.**  
`main` bleibt stabil; Conductor liefert parallel Inhalte; jede Architekturänderung wird über PR + `npm run ci` abgesichert.

### Warum das die beste Lösung ist

1) **Risikotrennung:** Architektur ist systemkritisch. Feature-Branches + PRs verhindern, dass `main` durch parallel laufende Content-Generierung “kaputt” geht.
2) **Konfliktarm + parallelisierbar:** Während ein Architektur-Branch läuft, können Conductor-Workspaces schon Content vorbereiten. Nach Merge wird sauber rebase/merge gemacht.
3) **Sauberer Verlauf / Rollback:** PRs sind nachvollziehbar und bei Bedarf leicht revertierbar.
4) **Worktree-Logik passt:** `main` ist lokal ausgecheckt; Conductor arbeitet ohnehin besser mit Feature-Branches.

## Goldene Branch-Struktur + Reihenfolge der PRs

### Phase 1 (Tag 1–2): Fundament (Architektur)

**PR 1 — `feat/naturraum-routing-core`**

- `/brandenburg/` Hub-Seite
- `/brandenburg/naturraum/[id]/` Dynamic Route
- `src/data/naturraeume/` (2 Beispiel-JSONs)
- Loader + Schema (Core) + Validator Script
- `npm run ci` muss grün sein

### Phase 2 (Tag 2–4): SEO- & Content-Mechanik (Architektur)

**PR 2 — `feat/seo-meta-canonical-og`**

- Meta-Komponente (title/description/canonical/og)
- Canonical-Helper auf `https://www.miiischwald.de/brandenburg/naturraum/<id>/`

**PR 3 — `feat/internal-links-blog-hook`**

- `InternalLinks`-Komponente (automatische Links)
- Blog-Filter nach `naturraum_id` (falls Blog existiert)

### Phase 3 (Tag 3–7): 14 Naturräume (Content, parallel via Conductor)

**Content-Strategie:** Conductor erzeugt JSON/Blogposts auf Content-Branches, ohne Architektur anzufassen.

- Option A: 1 Sammel-Branch `feat/naturraeume-seed-14`
- Option B: 3–4 Sammel-PRs (je 3–5 Naturräume)

### Phase 4 (Tag 7–10): Qualitäts-Upgrade (Guardrails)

**PR — `chore/quality-guards-v1`**

- optional Duplicate-Check (Heuristiken)
- optional Link-Check Script

### Phase 5 (Tag 10–14): Ausbaupfade vorbereiten

**PR — `feat/naturraum-subpages-stubs`** (optional)

- `/faq`, `/projekte` als Unterseiten (data-driven) oder Stubs

## Arbeitsregeln (entscheidend)

- **Architektur-Branches:** nur 1 gleichzeitig aktiv
- **Content-Branches:** beliebig viele parallel in Conductor
- Merge-Reihenfolge:
  1) Architektur PRs merge
  2) Content PRs: `git rebase origin/main` → merge

## Standard-Kommandos

### Lokal (main-Worktree)

```bash
cd /Users/lucaingenbleek/Documents/KOI_SEO/astro-landing-page-v1
git status -sb
git pull --rebase
```

### Conductor (Workspace-Worktree)

```bash
cd /Users/lucaingenbleek/conductor/workspaces/astro-landing-page-v1/<workspace>
git status -sb
git pull --rebase
```

### Content-Branch nach Architektur-Merge aktualisieren

```bash
git fetch origin
git rebase origin/main
git push --force-with-lease
```

## Nächster Schritt

Nach dem Verankern dieses Plans: erste Beispiel-Naturraum-Seite im Rahmen von PR 1 umsetzen (Routing + Schema + 1–2 Naturraum-JSONs).

