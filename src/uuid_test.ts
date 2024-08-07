import { assert, assertEquals, assertNotEquals } from "@std/assert";
import { generate } from "./generate.ts";
import { validate } from "./validate.ts";

// https://datatracker.ietf.org/doc/html/rfc9562#name-example-of-a-uuidv7-value
const RFC_TIMESTAMP = 0x017F22E279B0;

Deno.test("Check if the version of the provided uuid is 7", () => {
  assertEquals(validate(generate()), true);
  assertEquals(validate(generate(RFC_TIMESTAMP)), true);
  assertEquals(validate(crypto.randomUUID()), false);
  assertEquals(validate("00000000-0000-0000-0000-000000000000"), false);
});

Deno.test("Each uuid is unique", () => {
  assertNotEquals(generate(), generate());
});

Deno.test("Timestamp can be equal, but uuids cannot", () => {
  const uuids = new Set();

  for (let i = 0; i < 200; ++i) {
    const uuid = generate(RFC_TIMESTAMP);
    assert(!uuids.has(uuid));
    uuids.add(uuid);
  }
});

Deno.test("Check uuids monotonicity", () => {
  let u1 = generate();

  for (let i = 0; i < 10000; ++i) {
    const u2 = generate();
    assert(u2 > u1, `Monotonicity failed: ${u2} <= ${u1}`);
    u1 = u2;
  }
});

Deno.test("Check uuids monotonicity with the same timestamp", () => {
  let u1 = generate(RFC_TIMESTAMP);

  for (let i = 0; i < 10000; ++i) {
    const u2 = generate(RFC_TIMESTAMP);
    assert(u2 > u1, `Monotonicity failed: ${u2} <= ${u1}`);
    u1 = u2;
  }
});
