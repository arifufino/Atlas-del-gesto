import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { sites } from "../build/sites-vite-plugin.ts";

async function createProject({ hosting, migrations = [] } = {}) {
  const root = await mkdtemp(join(tmpdir(), "atlas-sites-plugin-"));

  if (hosting) {
    await mkdir(join(root, ".openai"), { recursive: true });
    await writeFile(join(root, ".openai", "hosting.json"), JSON.stringify(hosting));
  }
  if (migrations.length > 0) {
    await mkdir(join(root, "drizzle", "meta"), { recursive: true });
    for (const migration of migrations) {
      await writeFile(join(root, "drizzle", migration), "-- migration\n");
    }
  }

  return root;
}

async function runPlugin(root) {
  const plugin = sites();
  plugin.configResolved({ root });
  await plugin.closeBundle();
  return join(root, "dist", ".openai");
}

test("the plugin only runs on builds", () => {
  const plugin = sites();
  assert.equal(plugin.name, "sites");
  assert.equal(plugin.apply, "build");
});

test("packages hosting metadata and migrations into the bundle", async (t) => {
  const root = await createProject({
    hosting: { d1: "DB", r2: "BUCKET" },
    migrations: ["0000_init.sql"],
  });
  t.after(() => rm(root, { recursive: true, force: true }));

  const output = await runPlugin(root);

  assert.deepEqual(
    JSON.parse(await readFile(join(output, "hosting.json"), "utf8")),
    { d1: "DB", r2: "BUCKET" },
  );
  assert.equal(
    await readFile(join(output, "drizzle", "0000_init.sql"), "utf8"),
    "-- migration\n",
  );
});

test("creates an empty output directory when there is nothing to package", async (t) => {
  const root = await createProject();
  t.after(() => rm(root, { recursive: true, force: true }));

  const output = await runPlugin(root);

  assert.deepEqual(await readdir(output), []);
});

test("surfaces filesystem errors other than a missing file", async (t) => {
  const root = await mkdtemp(join(tmpdir(), "atlas-sites-plugin-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await writeFile(join(root, ".openai"), "not a directory");

  await assert.rejects(runPlugin(root), { code: "ENOTDIR" });
});

test("replaces metadata left by a previous build", async (t) => {
  const root = await createProject({ hosting: { d1: "DB" } });
  t.after(() => rm(root, { recursive: true, force: true }));

  const output = await runPlugin(root);
  await writeFile(join(output, "stale.json"), "{}");
  await runPlugin(root);

  assert.deepEqual(await readdir(output), ["hosting.json"]);
});
