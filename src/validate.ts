const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[7][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Determines whether a string is a valid
 * {@link https://datatracker.ietf.org/doc/html/rfc9562#name-uuid-version-7 | UUID v7}.
 *
 * @param uuid The UUID value
 *
 * @returns `true` if the string is a valid UUID v7, otherwise `false`.
 *
 * @example Usage
 * ```ts
 * import { validate } from "@babia/uuid-v7";
 * import { assert, assertFalse } from "@std/assert";
 *
 * assert(validate("01912747-539e-7817-a728-739eee071268"));
 * assertFalse(validate("943bb280-732e-4ae4-a4a5-c931fc67d891"));
 * ```
 */
export function validate(uuid: string): boolean {
  return UUID_RE.test(uuid);
}
