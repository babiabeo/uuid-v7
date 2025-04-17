import { test } from "@cross/test";
import { assert, assertNotEquals } from "@std/assert";
import { monotonicGen } from "./monotonic.ts";

// https://datatracker.ietf.org/doc/html/rfc9562#name-example-of-a-uuidv7-value
const RFC_TIMESTAMP = 0x017F22E279B0;

test("Each uuid is unique", () => {
  assertNotEquals(monotonicGen(), monotonicGen());
});

test("Timestamp can be equal but uuids cannot", () => {
  const uuids = new Set();

  for (let i = 0; i < 200; ++i) {
    const uuid = monotonicGen(RFC_TIMESTAMP);
    assert(!uuids.has(uuid));
    uuids.add(uuid);
  }
});

test("Check uuids monotonicity", () => {
  let u1 = monotonicGen();

  for (let i = 0; i < 50000; ++i) {
    const u2 = monotonicGen();
    assert(u2 > u1, `Monotonicity failed: ${u2} <= ${u1}`);
    u1 = u2;
  }
});

test("Check uuids monotonicity with the same timestamp", () => {
  let u1 = monotonicGen(RFC_TIMESTAMP);

  for (let i = 0; i < 50000; ++i) {
    const u2 = monotonicGen(RFC_TIMESTAMP);
    assert(u2 > u1, `Monotonicity failed: ${u2} <= ${u1}`);
    u1 = u2;
  }
});
