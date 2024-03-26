const path = require('path')
const stylexPlugin = require('@stylexjs/babel-plugin')
const rsdPlugin = require('react-strict-dom/babel')

module.exports = function (api) {
  // ref. https://docs.expo.dev/versions/latest/config/metro/#custom-transforming
  const platform = api.caller((caller) => (caller ? caller.platform : 'ios'))
  const isDev = api.caller((caller) =>
    caller
      ? caller.isDev
      : process.env.BABEL_ENV === 'development' ||
        process.env.NODE_ENV === 'development',
  )

  if (api.cache) {
    api.cache.invalidate(() => platform)
  }

  const plugins = ['react-native-reanimated/plugin']

  // Since we are using Next.js for web, this config is just for completeness sake.
  if (platform === 'web') {
    plugins.push(rsdPlugin)
    plugins.push([
      stylexPlugin,
      {
        dev: isDev,
        test: process.env.NODE_ENV === 'test',
        importSources: [
          '@stylexjs/stylex',
          { from: 'react-strict-dom', as: 'css' },
        ],
        runtimeInjection: isDev,
        // Required for compatibility with React Native resolution.
        styleResolution: 'property-specificity',
        unstable_moduleResolution: {
          rootDir: path.join(__dirname, '../..'), // __dirname,
          type: 'commonJS',
        },
      },
    ])
  }

  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins,
  }
}
