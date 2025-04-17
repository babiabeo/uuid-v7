export { validate } from "./src/validate.ts";

import { monotonicGen } from "./src/monotonic.ts";

/**
 * Generates a monotonically-increasing {@link https://datatracker.ietf.org/doc/html/rfc9562#name-uuid-version-7 | UUID v7}
 * based on Unix timestamp.
 *
 * @deprecated In the next versions, this function will no longer generate monotonic UUIDs but normal ones.
 * Use {@linkcode monotonicGen} to create monotonically-increasing UUIDs.
 *
 * @param timestamp The custom timestamp to generate the UUID.
 * @returns An UUID v7.
 *
 * @example Usage
 * ```ts
 * import { generate } from "@babia/uuid-v7";
 *
 * const u1 = generate();    // Using the current timestamp
 * const u2 = generate(123); // Using custom timestamp
 * ```
 */
export const generate = monotonicGen;

export { monotonicGen };
