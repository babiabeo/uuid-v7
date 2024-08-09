/**
 * The `uuid-v7` package provides UUIDv7 generator and validator based on
 * {@link https://datatracker.ietf.org/doc/html/rfc9562#name-uuid-version-7 | RFC 9562}.
 *
 * UUIDv7 features a time-ordered value field derived from the widely implemented
 * and well-known Unix Epoch timestamp source, the number of milliseconds since
 * midnight 1 Jan 1970 UTC, leap seconds excluded.
 *
 * ```ts
 * import { generate, validate } from "@babia/uuid-v7";
 *
 * // Create a new uuid
 * generate(); // => 01912d68-783e-7a03-8467-5661c1243ad4
 *
 * // Validate uuid v7
 * validate("00000000-0000-0000-0000-000000000000"); // => false
 * validate("019134ac-cfe8-7cd2-a5d6-f890b0c041c2"); // => true
 * ```
 *
 * @module
 */

export { generate } from "./src/generate.ts";
export { validate } from "./src/validate.ts";
