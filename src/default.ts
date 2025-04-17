/**
 * Generator for
 * {@link https://datatracker.ietf.org/doc/html/rfc9562#name-uuid-version-7 | RFC 9562 UUID v7}.
 *
 * ```ts
 * import { generate } from "@babia/uuid-v7/unstable-gen";
 *
 * const u1 = generate();    // Using the current timestamp
 * const u2 = generate(123); // Using custom timestamp
 * ```
 *
 * @module
 */

import { stringify } from "./_utils.ts";

/**
 * Generates a {@link https://datatracker.ietf.org/doc/html/rfc9562#name-uuid-version-7 | UUID v7}
 * based on Unix timestamp.
 *
 * @param timestamp The custom timestamp to generate the UUID.
 * @returns An UUID v7.
 *
 * @example Usage
 * ```ts
 * import { generate } from "@babia/uuid-v7/unstable-gen";
 *
 * const u1 = generate();    // Using the current timestamp
 * const u2 = generate(123); // Using custom timestamp
 * ```
 */
export function generate(timestamp?: number): string {
  const uuid = new Uint8Array(16);
  const tm = timestamp ?? Date.now();

  // [octets 0-5]: timestamp (48 bits)
  uuid[0] = (tm / 0x10000000000) & 0xff;
  uuid[1] = (tm / 0x100000000) & 0xff;
  uuid[2] = (tm / 0x1000000) & 0xff;
  uuid[3] = (tm / 0x10000) & 0xff;
  uuid[4] = (tm / 0x100) & 0xff;
  uuid[5] = tm & 0xff;

  // set random bits to remaining octets
  crypto.getRandomValues(uuid.subarray(6, 16));

  // [octet 6]: ver (4 bits) | random (4 bits)
  uuid[6] = 0x70 | (uuid[6] & 0x0f);

  // [octet 7]: random (8 bits)
  // (set above)

  // [octet 8]: var (2 bits) | random (6 bits)
  uuid[8] = 0x80 | (uuid[8] & 0x3f);

  // [octets 9-15]: random (56 bits)
  // (set above)

  return stringify(uuid);
}
