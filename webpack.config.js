/* global require, module, __dirname */
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/js/main.js'],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'app')
  },
  module: {
      loaders: [{
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
              presets: ['es2015']
          }
      }]
  },
  plugins: [
    new UglifyJsPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'src/index.html',
        to: './',
        toType: 'dir'
      },
      {
        from: 'src/fonts',
        to: './fonts',
        toType: 'dir'
      },
      {
        from: 'src/img',
        to: './img',
        toType: 'dir'
      },
    ])
  ],
};