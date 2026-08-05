import { RedirectError } from "../helpers/next-stubs.mjs";

export function redirect(destination) {
  throw new RedirectError(destination);
}
