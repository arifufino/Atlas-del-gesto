import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const output = new URL("../pages-dist/", import.meta.url);
const client = new URL("../dist/client/", import.meta.url);
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("pages-export", `${Date.now()}`);

const basePath = (process.env.PAGES_BASE_PATH || "/").replace(/\/?$/, "/");
const origin = (process.env.PAGES_ORIGIN || "https://pages-export.invalid").replace(/\/$/, "");
const { default: worker } = await import(workerUrl.href);

const response = await worker.fetch(
  new Request(`${origin}/`, { headers: { accept: "text/html", host: new URL(origin).host } }),
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

if (!response.ok) {
  throw new Error(`Could not render the site for GitHub Pages (${response.status}).`);
}

let html = await response.text();
html = html
  .replaceAll('"/assets/', `"${basePath}assets/`)
  .replaceAll('\\"/assets/', `\\"${basePath}assets/`)
  .replaceAll('href="/', `href="${basePath}`)
  .replaceAll('src="/', `src="${basePath}`)
  .replaceAll('content="/', `content="${basePath}`)
  .replaceAll("http://localhost:3000/og.png", `${origin}${basePath}og.png`)
  .replaceAll(`${origin}/og.png`, `${origin}${basePath}og.png`);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(client, output, { recursive: true });
await writeFile(new URL("index.html", output), html, "utf8");
await writeFile(new URL(".nojekyll", output), "", "utf8");

console.log(`Static GitHub Pages export ready at ${output.pathname}`);
