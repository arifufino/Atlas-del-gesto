import { readRequestHeaders } from "../helpers/next-stubs.mjs";

export async function headers() {
  return readRequestHeaders();
}
