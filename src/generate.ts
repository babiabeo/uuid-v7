import { stringify } from "./_stringify.ts";

/**
 * Generates an {@link https://datatracker.ietf.org/doc/html/rfc9562#name-uuid-version-7 | UUID version 7}
 * based on Unix timestamp.
 *
 * @param timestamp The custom timestamp to generate the UUID.
 * @returns A verion 7 UUID
 *
 * @example Usage
 * ```ts
 * import { generate } from "@babia/uuid-v7";
 *
 * const u1 = generate();    // Using the current timestamp
 * const u2 = generate(123); // Using the custom timestamp
 * ```
 */
export function generate(timestamp?: number): string {
  const uuid = new Uint8Array(16);
  const tm = timestamp ?? Date.now();
  const rand = crypto.getRandomValues(new Uint8Array(9));
  const seq = getSeq(tm, rand);

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
  uuid[9] = rand[2];
  uuid[10] = rand[3];
  uuid[11] = rand[4];
  uuid[12] = rand[5];
  uuid[13] = rand[6];
  uuid[14] = rand[7];
  uuid[15] = rand[8];

  return stringify(uuid);
}

// The last time the function is called
let _lastTime: number = -Infinity;
// The sequence number (18 bits)
let _seq: number | null = null;

function getSeq(now: number, rand: Uint8Array): number {
  _seq ??= ((now & 0x03) << 16) | (rand[0] << 8) | rand[1];

  if (now > _lastTime) {
    _lastTime = now;
    return _seq;
  }

  _seq = (_seq + 1) & 0x3ffff;

  if (_seq === 0) {
    ++_lastTime;
  }

  return _seq;
}
