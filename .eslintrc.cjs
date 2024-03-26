module.exports = {
  extends: ['eslint:recommended', 'next'],
  plugins: ['react-strict-dom'],
  settings: {
    next: {
      rootDir: 'apps/next/',
    },
  },
  globals: {
    React: 'readonly',
  },
  rules: {
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    'react-strict-dom/valid-styles': 'error',
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'react-native',
                message:
                  'Please split the code into separate *.web.{ts,tsx} and *.native.{ts,tsx} files.',
              },
            ],
          },
        ],
      },
    },
    {
      // Use *.native.{ts,tsx} files for React Native code in shared packages to avoid including 'react-native' in the bundle in web-only apps.
      // This means that importing 'react-native' in *.tsx files is not allowed, even if you have corresponding *.web.{ts,tsx} files.
      // You are allowed to import 'react-native' in *.d.ts files because they are not included in the bundle.
      // Also, you can import 'react-native' in Expo apps because they are React Native only apps.
      files: [
        '**/*.d.ts',
        'apps/expo/**/*.{ts,tsx}',
        'packages/app/**/*.native.{ts,tsx}',
      ],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
    // Jest
    {
      files:
        // https://jestjs.io/docs/configuration#testmatch-arraystring
        ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
  root: true,
}
