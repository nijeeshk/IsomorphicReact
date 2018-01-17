const webpack = require('webpack');
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const srcPath = './src/browser/';
const distPath = './dist/';

module.exports = {
  target: "web",
  entry: srcPath + "js/index.jsx",
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "js/bundle.js"
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/],
        loader: "file-loader",
        options: {
          name: "media/[name].[ext]",
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: "fonts/[name].[ext]",
        }
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: "css-loader",
              options: { importLoaders: 1 }
            },
            {
              loader: "postcss-loader",
              options: { plugins: [autoprefixer()] }
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
      }
    ]
  },
  watchOptions: {
    poll: true
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({
      filename: "css/[name].css"
    }),
    new webpack.BannerPlugin({
      banner: "__isBrowser__ = true;",
      raw: true,
      include: /\.(js|jsx)$/
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: srcPath + 'index.html.template',
      title: 'isomorphicReact'
    }),
  ]
}
