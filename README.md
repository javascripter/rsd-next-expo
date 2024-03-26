# RSD with Expo + Next.js 🚧

## 🔦 About

A monorepo for React Strict DOM with Expo + Next.js App Dir (RSC), with no dependencies of react-native-web for Next.js.

## Included packages

- React Strict DOM
- Expo SDK 50
- Next.js 14
- Expo Router 3
- Jest

## 🗂 Directory Structure

- `apps` entry points for each app

  - `expo`
  - `next`

- `packages` shared packages across apps
  - `app` you'll be importing most files from `app/`
    - `features` (don't use a `screens` folder. organize by feature.)

## 🏁 Start the app

- Install dependencies: `bun install`

- Next.js local dev: `turbo dev --filter=next`
  - Runs `next dev`
- Expo local dev:
  - First, build a dev client onto your device or simulator
    - `cd apps/expo`
    - Then, either `expo run:ios`, or `eas build`
  - After building the dev client, from the root of the monorepo...
    - Runs `expo start --dev-client`

## Scripts

We use one root config for common tasks like `typecheck`, `lint`, and `format`.
Install [`turbo`](https://turbo.build/repo) command globally and run `turbo [command]`.

```sh
turbo test # Runs all tests including typecheck, lint and format
```

```sh
turbo typecheck
```

```sh
turbo lint
```

```sh
turbo format
```

### Why root-level config/scripts?

This monorepo uses a single root-level configuration with scripts in the root directory. This approach offers several benefits:

#### Performance Benefits

- Running a single process is significantly faster than running multiple processes in parallel.
  - While Turborepo can alleviate this issue through caching, the cache is often invalidated when making changes to shared packages.
- In a per-package setup, dependent shared packages need to be type-checked multiple times, which is redundant.
- In real-world scenarios, running commands in the entire repository is not a performance bottleneck.

#### Reduced Setup Complexity

- Opening the project in VSCode from the root directory works seamlessly, without the need for VSCode Workspaces.
- Having a single root-level configuration eliminates the need to install and configure tools like ESLint for each package.

## Notes

### Resolutions

```json package.json
  "resolutions": {
    "schema-utils": "3.3.0"
  }
```

This line is required because expo-router depends on schema-utils which depends on ajv^8, and eslint requires ajv^6, causing dependency mismatches. You cannot directly add resolutions to ajv because of breaking changes between the versions, schema-utils version has been downgraded instead.
