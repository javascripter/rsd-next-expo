const path = require('path')
module.exports = function (api, _options) {
  if (api) {
    api.cache(true)
  }

  return {
    presets: ['next/babel'],
    plugins: [
      ['react-strict-dom/babel', {}],
      [
        '@stylexjs/babel-plugin',
        {
          dev: process.env.NODE_ENV === 'development',
          test: process.env.NODE_ENV === 'test',
          runtimeInjection: false,

          genConditionalClasses: true,
          treeshakeCompensation: true,
          // aliases: {
          //   '@/*': [path.join(__dirname, '*')],
          // },
          unstable_moduleResolution: {
            type: 'commonJS',
            rootDir: path.join(__dirname, '../..'), // __dirname,
          },
          // Required for compatibility with React Native resolution.
          styleResolution: 'property-specificity',
          importSources: [
            '@stylexjs/stylex',
            // Workaround for @stylexjs/nextjs-plugin plugin not supporting object import sources.
            // Styles will not be applied in production builds without this line.
            'react-strict-dom',
            { from: 'react-strict-dom', as: 'css' },
          ],
        },
      ],
    ],
  }
}
