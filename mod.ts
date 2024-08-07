/**
 * The `uuid-v7` package provides UUIDv7 generator and validator based on
 * {@link https://datatracker.ietf.org/doc/html/rfc9562#name-uuid-version-7 | RFC 9562}.
 *
 * UUIDv7 features a time-ordered value field derived from the widely implemented
 * and well-known Unix Epoch timestamp source, the number of milliseconds since
 * midnight 1 Jan 1970 UTC, leap seconds excluded
 *
 * @module
 */

export { generate } from "./src/generate.ts";
export { validate } from "./src/validate.ts";
