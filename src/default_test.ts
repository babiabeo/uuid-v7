import { test } from "@cross/test";
import { assert, assertNotEquals } from "@std/assert";
import { generate } from "./default.ts";

// https://datatracker.ietf.org/doc/html/rfc9562#name-example-of-a-uuidv7-value
const RFC_TIMESTAMP = 0x017F22E279B0;

test("Each uuid is unique", () => {
  assertNotEquals(generate(), generate());
});

test("Timestamp can be equal but uuids cannot", () => {
  const uuids = new Set();

  for (let i = 0; i < 200; ++i) {
    const uuid = generate(RFC_TIMESTAMP);
    assert(!uuids.has(uuid));
    uuids.add(uuid);
  }
});
