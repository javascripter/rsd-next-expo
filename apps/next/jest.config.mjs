import nextJest from 'next/jest.js'

import babelConfig from './babel.config.js'

const __dirname = new URL('.', import.meta.url).pathname
/**
 * @typedef {import('jest').Config} Config
 */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: __dirname,
})

/**
 * @type {Config}
 */
// Add any custom config to be passed to Jest
const config = {
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': [
      'babel-jest',
      {
        cwd: __dirname,
        ...babelConfig(),
      },
    ],
  },
  moduleFileExtensions: [
    // the order is important, the first one has higher priority
    'web.js',
    'web.jsx',
    'web.ts',
    'web.tsx',
    'js',
    'mjs',
    'cjs',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node',
  ],

  // FIXME: This disables prettier for jest because jest does not support prettier v3 yet.
  // Remove this line once we upgrade to Jest 30 or higher which supports prettier v3.
  // https://jestjs.io/docs/configuration/#prettierpath-string
  prettierPath: null,

  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
