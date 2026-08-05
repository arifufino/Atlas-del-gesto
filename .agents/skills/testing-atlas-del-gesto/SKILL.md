---
name: testing-atlas-del-gesto
description: How to build, serve and end-to-end test the "Atlas del gesto" vinext/Next static site locally, including the Cloudflare worker security-header path and the localStorage-backed "Mi colección" feature.
---

# Testing Atlas del gesto locally

## Node version (critical)
`package.json` requires Node >= 22.13. The box may default to Node 20, which breaks
`npm run dev` / `npm run build`. Always start with:

```bash
source ~/.nvm/nvm.sh && nvm use 22
```

`node_modules` are normally already installed under Node 22; re-run `npm install`
under Node 22 if module resolution errors appear.

## Running the app
- Dev: `npm run dev` → http://localhost:3000 (vinext/vite + `@cloudflare/vite-plugin`)
- Production-like: `npm run build` && `npm start` → http://localhost:3000
- Both go through `worker/index.ts` (the cloudflare vite plugin uses `main: ./worker/index.ts`),
  so worker-level response headers (CSP etc.) are observable in **dev as well as prod**.
  Prefer `npm start` when testing anything header/CSP related so the built bundles are exercised.
- Static export check: `node scripts/export-pages.mjs` (renders through the worker into `pages-dist/`).
- Rendered-HTML tests: `npm run build && node --test tests/rendered-html.test.mjs`.

Only port 3000 is used; kill a stale server with `pkill -f "vinext"` before restarting.
Starting the server with `(npm start &)` inside a one-shot `exec` call can silently fail —
run it in a persistent/background shell instead and poll with `curl`.

## UI landmarks (Spanish, single client-rendered page)
- Search input placeholder: `Buscar personaje, gesto o intención…`; `×` button clears it.
- `Temporada` `<select>` with options `Todas`, `1`…`6`.
- Body-channel tabs: `Todos`, `Mirada`, `Rostro`, `Postura`, `Manos`, `Movimiento`, `Voz`, `Distancia`, `Objeto`.
- Result count text: `N perfiles` (or `N perfiles guardados` when "Mi colección" is on) — use it as the
  assertion target for filters. Unfiltered baseline is `26 perfiles` / `109 patrones`.
- `Restablecer filtros` resets search + season + channel.
- Card star button: `aria-label="Guardar <Name>"` / `aria-label="Quitar <Name> de guardados"`.
- `Ver perfil ↗` opens the dialog; it closes with Escape or a backdrop click; the dialog has its
  own save button (`★ GUARDADO` when saved) and a `Cerrar perfil` close button.
- Nav button `Mi colección` toggles the saved-only filter and shows a numeric badge.

## Saved profiles / localStorage
Key: `atlas-gesto-saved`, value is a JSON array of profile ids.
Profile ids live in `app/data.ts` and are slugs like `thomas-shelby`, `polly-gray`,
`arthur-shelby` (NOT `tommy-shelby` — check `app/data.ts` before hand-crafting payloads).
The page filters stored ids against the known id set, so junk entries are dropped silently.
To test poisoning, set the key from the DevTools console and reload:
`localStorage.setItem("atlas-gesto-saved", JSON.stringify(["../../evil", 123, "thomas-shelby"]))`.
Clear state between runs with `localStorage.clear()`.

## Security-header / metadata checks
```bash
curl -s -D- -o /dev/null http://localhost:3000/            # CSP, HSTS, nosniff, X-Frame-Options
curl -s http://localhost:3000/ | grep og:image             # absolute OG URL
curl -s -H 'X-Forwarded-Host: evil.example.com"/><script>alert(1)</script>' \
        -H 'X-Forwarded-Proto: javascript' http://localhost:3000/ | grep -c evil.example.com
```
A *well-formed* `X-Forwarded-Host` is still honoured by design (trusted-proxy assumption);
only syntactically invalid hosts fall back to the real `Host`.

Routes under `examples/` (e.g. `examples/d1/app/api/notes/route.ts`) are NOT wired into the
app router — `curl http://localhost:3000/api/notes` returns 404, so those handlers can only be
reviewed statically, not exercised at runtime.

## Devin Secrets Needed
None — the site is fully static/local, no auth or API keys required.
