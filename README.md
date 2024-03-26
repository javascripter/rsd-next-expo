# RSD with Expo + Next.js 🚧

## 🔦 Overview

This monorepo showcases React Strict DOM (RSD) with Expo and Next.js App Directory (RSC). It provides a powerful combination of technologies without relying on react-native-web for Next.js integration.

## 📦 Included Packages

The monorepo includes the following key packages:

- React Strict DOM
- Expo SDK 50
- Next.js 14
- Expo Router 3
- Jest

## 🗂 Directory Structure

The monorepo follows this directory structure:

- `apps`: Contains entry points for each application

  - `expo`: Expo application
  - `next`: Next.js application

- `packages`: Contains shared packages used across applications
  - `app`: The main package from which most files are imported
    - `features`: Organizes code by feature

## 🚀 Getting Started

To start the applications, follow these steps:

1. Install dependencies by running bun install
2. For Next.js local development:

- Run `turbo dev --filter=next` to start the Next.js development server

3. For Expo local development:
  - First, build a development client on your device or simulator:
    - Navigate to `apps/expo` directory
    - Run either expo run:ios or eas build
  - After building the development client, from the root of the monorepo:
    - Run `expo start --dev-client` to start the Expo development server

## 📜 Scripts

The monorepo utilizes a single root-level configuration for common tasks such as type checking, linting, and formatting. Install the [`turbo`](https://turbo.build/repo) command globally and run `turbo [command]` to execute the desired script.

### Available Scripts

- `turbo test`: Runs all tests, including type checking, linting, and formatting
- `turbo typecheck`: Performs type checking
- `turbo lint`: Runs the linter
- `turbo format`: Formats the codebase

### Benefits of Root-Level Configuration

Using a single root-level configuration with scripts in the root directory offers several advantages:

#### Performance Benefits

- Running a single process is significantly faster compared to running multiple processes in parallel.
  - Although Turborepo can mitigate this issue through caching, the cache is often invalidated when making changes to shared packages.
- In a per-package setup, dependent shared packages need to be type-checked multiple times, leading to redundancy.
- In real-world scenarios, running commands in the entire repository does not introduce performance bottlenecks.

#### Reduced Setup Complexity

- Opening the project in VSCode from the root directory works seamlessly without the need for VSCode Workspaces.
- Having a single root-level configuration eliminates the need to install and configure tools like ESLint for each package individually.

## 📝 Notes

### Next.js production build issues

There is [a bug](https://github.com/facebook/stylex/issues/309) in StyleX Next.js Plugin preventing production builds.
A fix is being worked on in [this PR](https://github.com/facebook/stylex/pull/491). Until this issue is resolved upstream, production builds will fail to build.

### Resolutions

The package.json file includes the following resolution:

```json package.json
  "resolutions": {
    "schema-utils": "3.3.0"
  }
```

This resolution is required because `expo-router` depends on `schema-utils`, which in turn depends on `ajv^8`. However, eslint requires `ajv^6`, causing dependency mismatches. To resolve this issue, the version of schema-utils has been downgraded instead of directly adding resolutions to ajv due to breaking changes between the versions.
