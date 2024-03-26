const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const stylexPlugin = require('@stylexjs/nextjs-plugin')

function getStylexPlugin() {
  const babelConfig = require('./babel.config.js')
  const babelPlugins = babelConfig().plugins
  const [_name, options] = babelPlugins.find(
    (plugin) => Array.isArray(plugin) && plugin[0] === '@stylexjs/babel-plugin',
  )
  const rootDir = options.unstable_moduleResolution.rootDir ?? __dirname
  const aliases = options.aliases ?? undefined
  const useCSSLayers = options.useCSSLayers ?? undefined
  const stylexImports = options.importSources ?? undefined

  return stylexPlugin({
    rootDir,
    aliases,
    useCSSLayers,
    stylexImports,
  })
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@rsd-next-expo/app', 'react-strict-dom'],
  experimental: {
    typedRoutes: false,
  },
  webpack(config, _options) {
    config.resolve ??= {}
    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ]
    return config
  },
}

const plugins = [withBundleAnalyzer, getStylexPlugin()]

module.exports = plugins.reduce((config, plugin) => plugin(config), nextConfig)
