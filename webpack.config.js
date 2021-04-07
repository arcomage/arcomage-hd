const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')

const homeUrl = 'https://arcomage.github.io/'

module.exports = (env, argv) => {
  const dev = argv.mode === 'development'
  const local = env.NODE_ENV2 === 'local'
  process.env.NODE_ENV = argv.mode

  const config = {
    entry: {
      index: './src/index.tsx',
      pwacompat: './node_modules/pwacompat/src/pwacompat.js',
    },
    output: {
      filename: '[name].[contenthash:6].js',
      chunkFilename: '[name].[contenthash:6].js',
      publicPath: dev || local ? '' : homeUrl,
    },
    ...(dev ? { devtool: 'eval-cheap-module-source-map' } : {}),
    devServer: {
      port: 8080,
      open: true,
    },
    resolve: {
      extensions: [
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.scss',
        '.sass',
        '.css',
        '.json',
      ],
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
          },
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
          },
        },
        {
          test: /\.(s?c|sa)ss$/i,
          use: [
            'style-loader',
            'css-modules-typescript-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: dev,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: dev,
                postcssOptions: {
                  plugins: [
                    'postcss-import',
                    'tailwindcss',
                    'autoprefixer',
                    ...(dev ? [] : ['cssnano']),
                  ],
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: dev,
              },
            },
          ],
        },
        {
          test: /\.svg$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/img/[hash].[ext]',
              },
            },
            {
              loader: 'svgo-loader',
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|ico)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/img/[hash].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|otf|eot|ttf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/font/[hash].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(wav|mp3)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/sfx/[hash].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.APPVERSION': JSON.stringify(
          process.env.npm_package_version,
        ),
      }),
      new ForkTsCheckerWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html.ejs',
        filename: './index.html',
        title: 'ArcoMage HD',
        url: homeUrl,
        pwaManifestJson:
          dev || local ? './manifest.json' : `${homeUrl}manifest.json`,
        faviconSvg: dev || local ? './favicon.svg' : `${homeUrl}favicon.svg`,
        faviconIco: dev || local ? './favicon.ico' : `${homeUrl}favicon.ico`,
        ogImage: dev || local ? './ogimage.jpg' : `${homeUrl}ogimage.jpg`,
        description:
          "Web-based open source HD clone of 3DO and NWC's 2000 card game Arcomage",
      }),
      new CopyPlugin({
        patterns: [
          {
            from: 'assets/logo/**/*',
            to: '[name][ext]',
            globOptions: {
              ignore: ['**/logo.svg*', '**/manifest.template.ts'],
            },
          },
        ],
      }),
      ...(dev
        ? []
        : [
            new InjectManifest({
              maximumFileSizeToCacheInBytes: 100000000, // 100 MB
              swSrc: './src/service-worker.ts',
            }),
          ]),
    ],
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 20000,
        minRemainingSize: 0,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
  }

  return config
}
