const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')

module.exports = (env, argv) => {
  const dev = argv.mode === 'development'
  process.env.NODE_ENV = argv.mode
  const config = {
    entry: './src/index.tsx',
    output: {
      filename: '[name].[contenthash:6].js',
      chunkFilename: '[name].[contenthash:6].js',
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
                sourceMap: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
                postcssOptions: {
                  plugins: [
                    'postcss-import',
                    'tailwindcss',
                    ...(dev ? [] : ['autoprefixer', 'cssnano']),
                  ],
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/i,
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
          test: /\.(woff2?|ttf|eot)$/,
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
      new ForkTsCheckerWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html.ejs',
        filename: './index.html',
        title: 'ArcoMage HD',
        url: 'https://arcomage.github.io/',
        ogImage: './assets/misc/ogimage.jpg',
        faviconSvg: './assets/logo/favicon.svg',
        faviconIco: './assets/logo/favicon.ico',
        description: '',
      }),
      new PreloadWebpackPlugin({
        rel: 'preload',
        include: 'all',
        fileBlacklist: [/\.(?!(css$|woff$|woff2$|png$|jpe?g$|svg$|)).*$/],
        as(entry) {
          if (/\.css$/.test(entry)) return 'style'
          if (/\.(woff|woff2)$/.test(entry)) return 'font'
          if (/\.(png|jpe?g|svg)$/.test(entry)) return 'image'
          return 'script'
        },
      }),
      new PreloadWebpackPlugin({
        rel: 'prefetch',
        include: 'all',
        fileBlacklist: [/\.(?!(mp3$)).*$/],
        as(entry) {
          if (/\.mp3$/.test(entry)) return 'audio'
          return 'script'
        },
      }),
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
