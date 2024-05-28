import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import { publicDir, publicPath } from './src/buildConfig.js'

const require = createRequire(import.meta.url)

const isProduction = process.env.NODE_ENV === 'production'

export default /** @type {import('webpack').Configuration} */ ({
  mode: isProduction ? 'production' : 'development',
  entry: {
    main: './src/resources/main.css',
    home: './src/resources/home.css',
  },
  output: {
    path: fileURLToPath(publicDir),
    publicPath: `${publicPath}/`,
    ...(isProduction ? { filename: '[name].[contenthash].js' } : {}),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          require.resolve('css-loader'),
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                plugins: [
                  require.resolve('autoprefixer'),
                  require.resolve('postcss-nesting'),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      ...(isProduction
        ? { filename: '[name].[contenthash].css' }
        : { filename: '[name].css' }),
    }),
    new CopyPlugin({
      patterns: [
        {
          context: 'src/resources',
          from: '**/*.@(svg|webp|png)',
          to: isProduction
            ? '[path][name].[contenthash][ext]'
            : '[path][name][ext]',
        },
      ],
    }),
    new WebpackManifestPlugin({ writeToFileEmit: true }),
  ],
  devServer: { webSocketServer: false, port: 8083 },
})
