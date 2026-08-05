---
name: testing-atlas-del-gesto
description: How to run and end-to-end test the "Atlas del gesto" Next-on-Cloudflare (vinext + Vite) site locally, including the UI paths for search, filters, profile dialog and saved-profile persistence.
---

# Testing "Atlas del gesto" locally

## Environment
- Requires Node 22: `source ~/.nvm/nvm.sh && nvm use 22`. Note `nvm use` may print
  "No .nvmrc file found" if invoked oddly — pass the version explicitly.
- Install: `npm ci` (or `npm install`).
- Dev server: `npm run dev` → vinext dev on http://localhost:3000/. Startup takes ~20s.
- Unit tests: `npm test` = `vite build` + `node --experimental-strip-types --test "tests/*.test.mjs"`.
  The build step is slow-ish but required; expect a `1..N / # pass N / # fail 0` TAP summary.
- No credentials, secrets, backend or database are needed. No Devin secrets required.

## Deriving expected values before testing (recommended)
All content lives in `app/data.ts`. Compute the exact expected result counts instead of eyeballing:

```bash
node --experimental-strip-types -e "
const m = await import('./app/data.ts'); const p = m.profiles;
console.log(p.length, p.reduce((a,b)=>a+b.signals.length,0));
console.log(p.filter(x=>x.seasons.includes(2) && x.signals.some(s=>s.channel==='Voz')).length);
"
```
This makes filter tests adversarial: e.g. channel "Voz" alone vs "Voz" + Temporada 2 should give
different, precomputed counts, which catches an AND/OR filter regression.

## UI map (all in `app/page.tsx`, single client component)
- Top nav: `Personajes` (#atlas), `Método` (#metodo), `Fuentes` (#fuentes) — smooth scroll and
  `history.replaceState` hash update. `Mi colección` button on the right toggles the saved-only
  filter and shows a `<b>` badge with the saved count.
- Search input placeholder `Buscar personaje, gesto o intención…`; the clear button has
  `aria-label="Limpiar búsqueda"`. Note: `input type="search"` also renders a native clear glyph,
  so click the app's × (the right-most one inside the search box).
- `Temporada` `<select>` with options Todas, 1..6; channel tabs Todos/Mirada/Rostro/Postura/Manos/
  Movimiento/Voz/Distancia/Objeto.
- Result line is `aria-live="polite"` and reads `N perfil(es)[ guardados]`; a
  `Restablecer filtros` button appears only while some filter is active.
- Empty state heading: `No encontramos ese patrón`.
- `Ver perfil` opens a dialog (`role="dialog"`). It closes via the × (`aria-label="Cerrar perfil"`),
  the Escape key (window keydown listener), and a mousedown on `.dialog-backdrop`. The dialog is
  long — scroll inside it to reach the `Guardar perfil` / `Guardado` footer button.
- Saved state is persisted in `localStorage` under key `atlas-gesto-saved` (array of profile ids),
  hydrated in a `useEffect` with a `setTimeout(0)`, so wait ~1s after load before asserting counts.
  Reset a clean state with `localStorage.removeItem('atlas-gesto-saved')` before recording.

## Gotchas
- Character stills come from `public/stills/*` referenced as relative `./stills/...`. To prove images
  actually render (not just present in DOM), check
  `[...document.images].filter(i => !i.complete || i.naturalWidth === 0).length === 0`.
- Known cosmetic bug (as of this writing): with one saved profile the line reads
  "1 perfil guardados" — the adjective isn't singularised. Might be fixed later; if you see it,
  it's cosmetic and pre-existing, not a regression.
- The rendered page DOM is very large; prefer targeted `zoom` screenshots of the result line over
  dumping the whole DOM.
