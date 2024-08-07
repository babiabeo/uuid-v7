// Based on: https://github.com/uuidjs/uuid/blob/1e0f9870db864ca93f7a69db0d468b5e1b7605e7/src/stringify.ts

const byteToHex: string[] = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

/** Converts uuid from bytes to string. */
export function stringify(buf: Uint8Array): string {
  return (
    byteToHex[buf[0]] +
    byteToHex[buf[1]] +
    byteToHex[buf[2]] +
    byteToHex[buf[3]] +
    "-" +
    byteToHex[buf[4]] +
    byteToHex[buf[5]] +
    "-" +
    byteToHex[buf[6]] +
    byteToHex[buf[7]] +
    "-" +
    byteToHex[buf[8]] +
    byteToHex[buf[9]] +
    "-" +
    byteToHex[buf[10]] +
    byteToHex[buf[11]] +
    byteToHex[buf[12]] +
    byteToHex[buf[13]] +
    byteToHex[buf[14]] +
    byteToHex[buf[15]]
  ).toLowerCase();
}
