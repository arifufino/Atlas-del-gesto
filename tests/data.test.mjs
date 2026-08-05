import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";
import { channels, profiles, sources } from "../app/data.ts";

const stillExtensions = ["jpg", "png", "webp"];
const filterChannels = channels.filter((channel) => channel !== "Todos");

function assertFilledString(value, label) {
  assert.equal(typeof value, "string", `${label} must be a string`);
  assert.notEqual(value.trim(), "", `${label} must not be empty`);
}

async function stillExists(id) {
  for (const extension of stillExtensions) {
    try {
      await access(new URL(`../public/stills/${id}.${extension}`, import.meta.url));
      return true;
    } catch {
      continue;
    }
  }
  return false;
}

test("profiles use unique slug identifiers", () => {
  assert.ok(profiles.length > 0);

  const ids = profiles.map((profile) => profile.id);
  assert.equal(new Set(ids).size, ids.length, "profile ids must be unique");

  for (const id of ids) {
    assert.match(id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${id} must be a slug`);
  }
});

test("profiles describe every editorial field", () => {
  for (const profile of profiles) {
    for (const field of ["name", "role", "archetype", "signature", "evolution"]) {
      assertFilledString(profile[field], `${profile.id}.${field}`);
    }
    assert.match(profile.palette, /^#[0-9a-f]{6}$/i, `${profile.id}.palette`);
  }
});

test("profiles reference seasons within the six aired seasons", () => {
  for (const profile of profiles) {
    const { seasons } = profile;
    assert.ok(seasons.length > 0, `${profile.id} must appear in a season`);
    assert.equal(
      new Set(seasons).size,
      seasons.length,
      `${profile.id} repeats a season`,
    );
    assert.deepEqual(
      [...seasons].sort((a, b) => a - b),
      seasons,
      `${profile.id} seasons must be sorted`,
    );
    for (const season of seasons) {
      assert.ok(
        Number.isInteger(season) && season >= 1 && season <= 6,
        `${profile.id} has an out-of-range season: ${season}`,
      );
    }
  }
});

test("signals are complete and use a known body channel", () => {
  for (const profile of profiles) {
    assert.ok(profile.signals.length > 0, `${profile.id} has no signals`);

    const titles = profile.signals.map((signal) => signal.title);
    assert.equal(
      new Set(titles).size,
      titles.length,
      `${profile.id} repeats a signal title`,
    );

    for (const signal of profile.signals) {
      assert.ok(
        filterChannels.includes(signal.channel),
        `${profile.id} uses unknown channel ${signal.channel}`,
      );
      for (const field of ["title", "observation", "function", "context"]) {
        assertFilledString(signal[field], `${profile.id}.${signal.title}.${field}`);
      }
    }
  }
});

test("channel filters start with the reset option and are all in use", () => {
  assert.equal(channels[0], "Todos");
  assert.equal(new Set(channels).size, channels.length);

  const used = new Set(
    profiles.flatMap((profile) => profile.signals.map((signal) => signal.channel)),
  );
  for (const channel of filterChannels) {
    assert.ok(used.has(channel), `no signal uses the ${channel} filter`);
  }
});

test("sources are unique, labelled and reachable over https", () => {
  assert.ok(sources.length > 0);

  const urls = sources.map((source) => source.url);
  assert.equal(new Set(urls).size, urls.length, "source urls must be unique");

  for (const source of sources) {
    assertFilledString(source.label, "source.label");
    assertFilledString(source.type, "source.type");
    assert.equal(
      new URL(source.url).protocol,
      "https:",
      `${source.url} must use https`,
    );
  }
});

test("every profile ships a still image", async () => {
  for (const profile of profiles) {
    assert.ok(
      await stillExists(profile.id),
      `public/stills/${profile.id}.{${stillExtensions.join(",")}} is missing`,
    );
  }
});
