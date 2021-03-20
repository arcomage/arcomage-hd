// const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (env, argv) => {
  const dev = argv.mode === 'development'
  process.env.NODE_ENV = argv.mode
  const config = {
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js',
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
      new HtmlWebpackPlugin({
        template: './src/index.html.ejs',
        filename: './index.html',
        title: 'ArcoMage',
        url: 'https://arcomage.github.io/',
        ogImage: './assets/misc/ogimage.jpg',
        faviconSvg: './assets/logo/favicon.svg',
        faviconIco: './assets/logo/favicon.ico',
        description: '',
      }),
      new CopyPlugin({
        patterns: [{ from: 'assets/img/cards', to: 'assets/img/cards' }],
      }),
    ],
  }

  return config
}
