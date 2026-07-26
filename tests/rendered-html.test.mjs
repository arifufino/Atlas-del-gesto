import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://atlas-del-gesto.example${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the atlas and its research content", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="es">/i);
  assert.match(html, /Atlas del gesto/i);
  assert.match(html, /El cuerpo también/i);
  assert.match(html, /Thomas Shelby/i);
  assert.match(html, /Firmas corporales/i);
  assert.match(html, /Fuentes consultadas/i);
  assert.match(html, /stills\/thomas-shelby\.jpg/i);
  assert.match(html, /Fotograma de la serie/i);
  assert.doesNotMatch(html, /gesture-atlas\.png/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("includes a complete, accessible first render", async () => {
  const html = await (await render()).text();
  assert.match(html, /aria-label="Navegación principal"/i);
  assert.match(html, /Investigación de las 6 temporadas/i);
  assert.match(html, /Leer patrones, no adivinar pensamientos/i);
  assert.match(html, /Peaky Blinders/i);
});
