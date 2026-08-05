const WORKER_ENTRY = "../dist/server/index.js";

/**
 * Loads the built worker and renders a request with stubbed Cloudflare
 * bindings. The cache key keeps repeated imports from reusing module state.
 */
export async function renderWithWorker(request, cacheKey) {
  const workerUrl = new URL(WORKER_ENTRY, import.meta.url);
  workerUrl.searchParams.set("render", cacheKey);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    request,
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
