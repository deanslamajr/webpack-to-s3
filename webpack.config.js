const path = require('path');

const webpack = require('webpack');

const envVars = require('./config/environment.json');

const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =  {
  // ------------------------------------
  // Entry Point
  // ------------------------------------
  entry: path.join(__dirname, 'src', 'index.js'),
  // ------------------------------------
  // Output
  // ------------------------------------
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name]-[hash].js',
    publicPath: `${envVars['S3_BUCKET_URL']}/`
  },
  // ------------------------------------
  // Source Maps
  // ------------------------------------
  devtool: 'source-map',
  // ------------------------------------
  // Modules
  // ------------------------------------
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  // ------------------------------------
  // Plugins
  // ------------------------------------
  plugins: [
    // emits a json file with assets paths 
    new AssetsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.ejs'),
      filename: 'index.ejs',
      inject: 'body'
    })
  ]
}