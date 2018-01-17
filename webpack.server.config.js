const webpack = require('webpack');
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const srcPath = './src/server/';
const distPath = './dist/';

module.exports = {
  target: 'node',
  entry: srcPath + 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'server.js'
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
};
