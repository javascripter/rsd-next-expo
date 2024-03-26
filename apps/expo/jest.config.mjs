const __dirname = new URL('.', import.meta.url).pathname

/** @type {import('jest').Config} */
const config = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    '/node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|react-strict-dom)',
    '/node_modules/react-native-reanimated/plugin/',
  ],
  moduleNameMapper: {
    // We test against the native version of react-strict-dom only
    'react-strict-dom': 'react-strict-dom/dist/native',
  },
  transform: {
    '\\.[jt]sx?$': [
      'babel-jest',
      {
        caller: { name: 'metro', bundler: 'metro', platform: 'ios' },
      },
    ],
  },

  // FIXME: This disables prettier for jest because jest does not support prettier v3 yet.
  // Remove this line once we upgrade to Jest 30 or higher which supports prettier v3.
  // https://jestjs.io/docs/configuration/#prettierpath-string
  prettierPath: null,

  setupFilesAfterEnv: ['@testing-library/react-native/extend-expect'],
}

export default config
