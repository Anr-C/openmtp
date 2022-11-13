const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');

const IS_PROD = process.env.NODE_ENV === 'production';
const buildPath = path.join(__dirname, '..', '..', 'docs');

const baseConfig = {
  mode: process.env.NODE_ENV,
  entry: {
    index: './docs-sources/index.js',
  },
  output: {
    filename: 'bundle/[name].[hash:20].js',
    path: buildPath,
    assetModuleFilename: 'bundle/[name].[hash:20][ext]',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './docs-sources/templates/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
      },
    }),

    new HtmlWebpackPlugin({
      template: './docs-sources/templates/privacy.html',
      inject: true,
      chunks: ['privacy'],
      filename: 'privacy.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  edge: '12',
                },
              },
            ],
          ],
          cacheDirectory: true,
        },
      },
      {
        test: /\.(?:ico|jpe?g|png|gif|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },
};

module.exports = merge(baseConfig, IS_PROD ? prodConfig : devConfig);
