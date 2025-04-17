# uuid-v7

[![JSR](https://jsr.io/badges/@babia/uuid-v7)][jsr]
[![JSR Score](https://jsr.io/badges/@babia/uuid-v7/score)][jsr]
[![CI](https://github.com/babiabeo/uuid-v7/actions/workflows/ci.yml/badge.svg)](https://github.com/babiabeo/uuid-v7/actions/workflows/ci.yml)

> [!NOTE]
> The `@std` library also has an unstable implementation of uuid v7. See
> [`@std/uuid/unstable-v7`](https://jsr.io/@std/uuid/doc/unstable-v7/~).

The `uuid-v7` package provides UUIDv7 generator and validator based on
[RFC 9562][rfc].

UUIDv7 features a time-ordered value field derived from the widely implemented
and well-known Unix Epoch timestamp source, the number of milliseconds since
midnight 1 Jan 1970 UTC, leap seconds excluded.

## Quick start

#### Install

This package is available on [jsr.io][jsr].

```sh
# Deno
deno add @babia/uuid-v7

# npm
npx jsr add @babia/uuid-v7

# yarn
yarn dlx jsr add @babia/uuid-v7

# pnpm
pnpm dlx jsr add @babia/uuid-v7

# Bun
bunx jsr add @babia/uuid-v7
```

> [!IMPORTANT]
> Currently, this package contains 4 sub-modules:
>
> - `validate`: For validating uuids v7.
> - `monotonic`: For generating uuids monotonically.
> - `generate`: Same as `monotonic` (**NOT RECOMMENDED** at the moment).
> - `unstable-gen` **_(New API)_**: For generating normal uuid v7.

> [!WARNING]
> In the next versions, `unstable-gen` sub-module will be renamed to `generate`,
> leading to a breaking change. That's why using `generate` sub-module is NOT
> RECOMMENDED at the moment.

#### Example: Generate a new uuid

##### Normal uuid

```ts
import { generate } from "@babia/uuid-v7/unstable-gen";

generate(); // => 01912d68-01fe-7a03-a190-b5622fd831e9
```

##### Monotonically-increasing uuid

```ts
import { monotonicGen } from "@babia/uuid-v7/monotonic";

monotonicGen(); // => 01912d68-783e-7a03-8467-5661c1243ad4
```

## Documentation

The documentation for the package can be found here:

https://jsr.io/@babia/uuid-v7/doc

## License

This package is licensed for use under [MIT License](./LICENSE).

[jsr]: https://jsr.io/@babia/uuid-v7
[rfc]: https://datatracker.ietf.org/doc/html/rfc9562#name-uuid-version-7

---

###### Copyright &copy; 2024 David (babiabeo)
