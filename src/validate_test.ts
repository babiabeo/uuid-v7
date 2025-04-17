import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { validate } from "./validate.ts";
import { monotonicGen } from "./monotonic.ts";
import { generate } from "./default.ts";

// https://datatracker.ietf.org/doc/html/rfc9562#name-example-of-a-uuidv7-value
const RFC_TIMESTAMP = 0x017F22E279B0;

test("Check if the version of the provided uuid is 7", () => {
  assertEquals(validate(monotonicGen()), true);
  assertEquals(validate(monotonicGen(RFC_TIMESTAMP)), true);
  assertEquals(validate(generate()), true);
  assertEquals(validate(generate(RFC_TIMESTAMP)), true);
  assertEquals(validate(crypto.randomUUID()), false);
  assertEquals(validate("00000000-0000-0000-0000-000000000000"), false);
});
