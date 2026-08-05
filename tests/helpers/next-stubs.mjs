import { registerHooks } from "node:module";

const stubs = {
  "next/headers": new URL("../stubs/next-headers.mjs", import.meta.url).href,
  "next/navigation": new URL("../stubs/next-navigation.mjs", import.meta.url).href,
};

let requestHeaders = new Headers();
let hooksRegistered = false;

export class RedirectError extends Error {
  constructor(destination) {
    super(`NEXT_REDIRECT ${destination}`);
    this.name = "RedirectError";
    this.destination = destination;
  }
}

export function setRequestHeaders(init = {}) {
  requestHeaders = new Headers(init);
}

export function readRequestHeaders() {
  return requestHeaders;
}

// Resolves `next/*` server imports to local stubs so server-only modules can be
// unit tested outside a Next.js request scope.
export function installNextStubs() {
  if (hooksRegistered) return;
  hooksRegistered = true;
  registerHooks({
    resolve(specifier, context, nextResolve) {
      const url = stubs[specifier];
      if (url) return { url, shortCircuit: true };
      return nextResolve(specifier, context);
    },
  });
}
