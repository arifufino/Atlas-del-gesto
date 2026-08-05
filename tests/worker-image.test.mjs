import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

function createEnv({ asset } = {}) {
  const calls = { assets: [], transform: [], output: [] };

  return {
    calls,
    env: {
      ASSETS: {
        fetch: async (request) => {
          calls.assets.push(new URL(request.url).pathname);
          if (!asset) return new Response("Not found", { status: 404 });
          return new Response(new Blob([asset]).stream(), {
            headers: { "content-type": "image/jpeg" },
          });
        },
      },
      IMAGES: {
        input: () => ({
          transform: (options) => {
            calls.transform.push(options);
            return {
              output: (options) => {
                calls.output.push(options);
                return Promise.resolve({
                  response: () =>
                    new Response("optimized", {
                      headers: { "content-type": "image/webp" },
                    }),
                });
              },
            };
          },
        }),
      },
    },
  };
}

function optimize(env, query) {
  return worker.fetch(
    new Request(`https://atlas-del-gesto.example/_vinext/image?${query}`, {
      headers: { accept: "image/webp" },
    }),
    env,
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("optimizes a local still through the images binding", async () => {
  const { calls, env } = createEnv({ asset: new Uint8Array([255, 216, 255]) });

  const response = await optimize(
    env,
    "url=%2Fstills%2Fthomas-shelby.jpg&w=640&q=75",
  );

  assert.equal(response.status, 200);
  assert.equal(await response.text(), "optimized");
  assert.deepEqual(calls.assets, ["/stills/thomas-shelby.jpg"]);
  assert.deepEqual(calls.transform, [{ width: 640 }]);
  assert.deepEqual(calls.output, [{ format: "image/webp", quality: 75 }]);
});

test("returns 404 when the requested still is not part of the bundle", async () => {
  const { calls, env } = createEnv();

  const response = await optimize(env, "url=%2Fstills%2Fmissing.jpg&w=640&q=75");

  assert.equal(response.status, 404);
  assert.deepEqual(calls.transform, []);
});

test("rejects unknown widths and remote sources", async () => {
  for (const query of [
    "",
    "url=%2Fstills%2Fthomas-shelby.jpg&w=641&q=75",
    "url=https%3A%2F%2Fevil.example%2Fstill.jpg&w=640&q=75",
  ]) {
    const { calls, env } = createEnv({ asset: new Uint8Array([255]) });

    const response = await optimize(env, query);

    assert.equal(response.status, 400, `expected 400 for "${query}"`);
    assert.deepEqual(calls.assets, [], `expected no asset lookup for "${query}"`);
  }
});
