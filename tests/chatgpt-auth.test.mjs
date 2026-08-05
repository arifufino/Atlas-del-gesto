import assert from "node:assert/strict";
import test from "node:test";
import {
  RedirectError,
  installNextStubs,
  setRequestHeaders,
} from "./helpers/next-stubs.mjs";

installNextStubs();

const {
  chatGPTSignInPath,
  chatGPTSignOutPath,
  getChatGPTUser,
  requireChatGPTUser,
} = await import("../app/chatgpt-auth.ts");

const EMAIL_HEADER = "oai-authenticated-user-email";
const FULL_NAME_HEADER = "oai-authenticated-user-full-name";
const ENCODING_HEADER = "oai-authenticated-user-full-name-encoding";

test("chatGPTSignInPath keeps relative return paths with search and hash", () => {
  assert.equal(
    chatGPTSignInPath("/atlas?season=3#thomas"),
    "/signin-with-chatgpt?return_to=%2Fatlas%3Fseason%3D3%23thomas",
  );
});

test("chatGPTSignInPath rejects return paths that leave the app", () => {
  for (const returnTo of [
    "https://evil.example/atlas",
    "//evil.example/atlas",
    "/\\evil.example/atlas",
    "atlas",
    "",
  ]) {
    assert.equal(
      chatGPTSignInPath(returnTo),
      "/signin-with-chatgpt?return_to=%2F",
      `expected ${JSON.stringify(returnTo)} to fall back to "/"`,
    );
  }
});

test("chatGPTSignInPath rejects the reserved auth paths", () => {
  for (const returnTo of [
    "/signin-with-chatgpt",
    "/signout-with-chatgpt",
    "/callback",
  ]) {
    assert.equal(
      chatGPTSignInPath(returnTo),
      "/signin-with-chatgpt?return_to=%2F",
      `expected ${returnTo} to fall back to "/"`,
    );
  }
});

test("chatGPTSignOutPath defaults to the site root", () => {
  assert.equal(chatGPTSignOutPath(), "/signout-with-chatgpt?return_to=%2F");
  assert.equal(
    chatGPTSignOutPath("/metodo"),
    "/signout-with-chatgpt?return_to=%2Fmetodo",
  );
  assert.equal(
    chatGPTSignOutPath("https://evil.example"),
    "/signout-with-chatgpt?return_to=%2F",
  );
});

test("getChatGPTUser returns null without an authenticated email", async () => {
  setRequestHeaders();
  assert.equal(await getChatGPTUser(), null);
});

test("getChatGPTUser falls back to the email as display name", async () => {
  setRequestHeaders({ [EMAIL_HEADER]: "tommy@shelby.example" });

  assert.deepEqual(await getChatGPTUser(), {
    displayName: "tommy@shelby.example",
    email: "tommy@shelby.example",
    fullName: null,
  });
});

test("getChatGPTUser decodes percent-encoded full names", async () => {
  setRequestHeaders({
    [EMAIL_HEADER]: "polly@shelby.example",
    [FULL_NAME_HEADER]: "Polly%20Gray%20%C3%B1",
    [ENCODING_HEADER]: "percent-encoded-utf-8",
  });

  assert.deepEqual(await getChatGPTUser(), {
    displayName: "Polly Gray ñ",
    email: "polly@shelby.example",
    fullName: "Polly Gray ñ",
  });
});

test("getChatGPTUser ignores full names without the expected encoding", async () => {
  setRequestHeaders({
    [EMAIL_HEADER]: "ada@shelby.example",
    [FULL_NAME_HEADER]: "Ada Thorne",
  });

  assert.deepEqual(await getChatGPTUser(), {
    displayName: "ada@shelby.example",
    email: "ada@shelby.example",
    fullName: null,
  });
});

test("getChatGPTUser ignores full names that cannot be decoded", async () => {
  setRequestHeaders({
    [EMAIL_HEADER]: "arthur@shelby.example",
    [FULL_NAME_HEADER]: "%E0%A4%A",
    [ENCODING_HEADER]: "percent-encoded-utf-8",
  });

  assert.deepEqual(await getChatGPTUser(), {
    displayName: "arthur@shelby.example",
    email: "arthur@shelby.example",
    fullName: null,
  });
});

test("requireChatGPTUser returns the authenticated user", async () => {
  setRequestHeaders({ [EMAIL_HEADER]: "john@shelby.example" });

  const user = await requireChatGPTUser("/atlas");
  assert.equal(user.email, "john@shelby.example");
});

test("requireChatGPTUser redirects anonymous visitors to sign in", async () => {
  setRequestHeaders();

  await assert.rejects(
    () => requireChatGPTUser("/atlas?season=3"),
    (error) => {
      assert.ok(error instanceof RedirectError);
      assert.equal(
        error.destination,
        "/signin-with-chatgpt?return_to=%2Fatlas%3Fseason%3D3",
      );
      return true;
    },
  );
});
