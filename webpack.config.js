const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (env, argv) => {
  const dev = argv.mode === 'development'
  process.env.NODE_ENV = argv.mode
  const config = {
    entry: './src/index.tsx',
    output: {
      filename: '[name].[contenthash:6].js',
      chunkFilename: '[name].[contenthash:6].js',
      publicPath: dev ? '' : 'https://arcomage.github.io/',
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
      new ForkTsCheckerWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html.ejs',
        filename: './index.html',
        title: 'ArcoMage HD',
        url: 'https://arcomage.github.io/',
        ogImage: dev
          ? 'https://arcomage.github.io/ogimage.jpg'
          : './ogimage.jpg',
        faviconSvg: dev
          ? 'https://arcomage.github.io/favicon.svg'
          : './favicon.svg',
        faviconIco: dev
          ? 'https://arcomage.github.io/favicon.ico'
          : './favicon.ico',
        description:
          "Web-based open source HD clone of 3DO and NWC's 2000 card game Arcomage",
      }),
      new PreloadWebpackPlugin({
        rel: 'preload',
        include: 'all',
        fileBlacklist: [/\.(?!(css$|woff$|woff2$|png$|jpe?g$|svg$)).*$/],
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
      new CopyPlugin({
        patterns: [
          { from: './assets/logo/favicon.svg', to: './favicon.svg' },
          { from: './assets/logo/favicon.ico', to: './favicon.ico' },
          { from: './assets/misc/ogimage.jpg', to: './ogimage.jpg' },
        ],
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
