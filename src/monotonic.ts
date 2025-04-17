/**
 * Monotonic generator for
 * {@link https://datatracker.ietf.org/doc/html/rfc9562#name-uuid-version-7 | RFC 9562 UUID v7}.
 *
 * ```ts
 * import { monotonicGen } from "@babia/uuid-v7/monotonic";
 *
 * const u1 = monotonicGen();    // Using the current timestamp
 * const u2 = monotonicGen(123); // Using custom timestamp

 * ```
 *
 * @module
 */

import { stringify } from "./_utils.ts";

/**
 * Generates a monotonically-increasing {@link https://datatracker.ietf.org/doc/html/rfc9562#name-uuid-version-7 | UUID v7}
 * based on Unix timestamp.
 *
 * @param timestamp The custom timestamp to generate the UUID.
 * @returns An UUID v7.
 *
 * @example Usage
 * ```ts
 * import { monotonicGen } from "@babia/uuid-v7/monotonic";
 *
 * const u1 = monotonicGen();    // Using the current timestamp
 * const u2 = monotonicGen(123); // Using custom timestamp
 * ```
 */
export function monotonicGen(timestamp?: number): string {
  const uuid = new Uint8Array(16);
  const now = timestamp ?? Date.now();
  const rand = crypto.getRandomValues(new Uint8Array(10));
  const [seq, tm] = getState(now, rand);

  // [octets 0-5]: timestamp (48 bits)
  uuid[0] = (tm / 0x10000000000) & 0xff;
  uuid[1] = (tm / 0x100000000) & 0xff;
  uuid[2] = (tm / 0x1000000) & 0xff;
  uuid[3] = (tm / 0x10000) & 0xff;
  uuid[4] = (tm / 0x100) & 0xff;
  uuid[5] = tm & 0xff;

  // [octet 6]: ver (4 bits) | seq bits 14-17 (4 bits)
  uuid[6] = 0x70 | ((seq >>> 14) & 0x0f);

  // [octet 7]: seq bits 6-13 (8 bits)
  uuid[7] = (seq >>> 6) & 0xff;

  // [octet 8]: var (2 bits) | seq bits 0-5 (6 bits)
  uuid[8] = 0x80 | (seq & 0x3f);

  // [octets 9-15]: random (56 bits)
  uuid[9] = rand[0];
  uuid[10] = rand[1];
  uuid[11] = rand[2];
  uuid[12] = rand[3];
  uuid[13] = rand[4];
  uuid[14] = rand[5];
  uuid[15] = rand[6];

  return stringify(uuid);
}

// The last time the function was called
let lastTime = -Infinity;
// The sequence number (18 bits)
let seq = 0;

function getState(now: number, rand: Uint8Array): [number, number] {
  if (now > lastTime) {
    seq = ((rand[7] & 0x03) << 16) | (rand[8] << 8) | (rand[9]);
    lastTime = now;

    return [seq, lastTime];
  }

  seq = (seq + 1) & 0x3ffff;

  if (seq === 0) {
    ++lastTime;
  }

  return [seq, lastTime];
}
