---
name: testing-atlas-ui
description: How to run and end-to-end test the Atlas del gesto single-page app locally (dev server, Node version, UI selectors, localStorage state, lint/build/export checks).
---

# Testing the Atlas del gesto UI

Spanish-language single-page React app (vinext/Vite + Cloudflare plugin). No auth, no backend,
no database — everything renders client-side from `app/data.ts`. Nothing needs to be seeded.

## Devin Secrets Needed

None.

## Running it

The repo requires Node >= 22.13 but the VM default may be Node 20. Start every shell with:

```bash
source ~/.nvm/nvm.sh && nvm use 22
```

Then `npm run dev` — it serves on **http://localhost:3000** (confirm from the vinext output; it
prints `➜ Local: http://localhost:3000/`).

## Checks that should pass

```bash
npm run lint
npm run build
node --test tests/rendered-html.test.mjs
PAGES_BASE_PATH=/Atlas-del-gesto/ PAGES_ORIGIN=https://arifufino.github.io node scripts/export-pages.mjs
```

**Gotcha:** `npm run lint` is `eslint . --ignore-pattern dist --ignore-pattern .next`. It does
*not* ignore `pages-dist/`, so if a previous export left that directory around, ESLint lints the
minified bundles and fails with `react-hooks/rules-of-hooks` errors plus hundreds of warnings.
If lint fails with errors pointing at files under `pages-dist/assets/*.js`, that is not a source
problem — `rm -rf pages-dist` (or add `--ignore-pattern pages-dist`) and re-run.

## UI map (for writing test steps)

Single page, all sections stacked. Everything lives in `app/page.tsx` with pieces in
`app/components.tsx` and helpers in `app/utils.ts`.

- Nav (`.topbar`, not sticky — scroll fully to top before clicking it): brand lockup, "Personajes"
  (`#atlas`), "Método" (`#metodo`), "Fuentes" (`#fuentes`), and the "Mi colección" toggle with a
  count badge. Links call `scrollToSection` which `replaceState`s the hash — assert on the URL hash.
- Filters: search input (placeholder "Buscar personaje, gesto o intención…"), a `×` clear button
  that appears only when the query is non-empty (note Chrome also draws its own native clear icon
  inside `type="search"` — the app's button is the right-most one), a "Temporada" `<select>`
  (Todas, 1–6), and channel tab buttons (Todos, Mirada, Rostro, Postura, Manos, Movimiento, Voz,
  Distancia, Objeto). The result line reads "N perfiles" / "N perfil" / "N perfiles guardados" and
  exposes "Restablecer filtros" when any filter is active.
- Cards (`.profile-card`): `.card-number` (01, 02…), `.star-button` (31px circular grid button,
  gets `.saved` and turns filled red), `.card-gesture-gallery` of `figure.gesture-visual`,
  `.featured-signal > span` holds the channel name, `.card-footer` has season marks + "Ver perfil".
- Dialog: opened by "Ver perfil". Closes on Escape and on `.dialog-backdrop` mousedown (clicks
  inside `.profile-dialog` must not close it). Footer button label is "Guardado" / "Guardar perfil"
  and must stay in sync with that card's star.
- Empty state: "No encontramos ese patrón".

## Useful assertions

- Broken images: `[...document.images].filter(i => i.complete && i.naturalWidth === 0).length`
  should be 0 (the full home page has ~135 images).
- Saved profiles live in `localStorage["atlas-gesto-saved"]` as a JSON array of profile ids
  (e.g. `["thomas-shelby","arthur-shelby"]`). Clear it before a run to get a deterministic start;
  reload the page to verify persistence.
- To prove the search really scans nested signal fields (and not just names), search for a phrase
  that appears only inside one `signals[].observation` in `app/data.ts` (e.g. "zancada regular",
  unique to Thomas Shelby) and assert exactly one card is left. A name-only search like "Thomas"
  would still pass on a broken deep-search implementation.
- To prove filters intersect rather than override, apply a channel tab *and* a season and assert
  both hold on every remaining card (channel via `.featured-signal > span`, season via the 6th
  `.season-mark` having class `active`).
