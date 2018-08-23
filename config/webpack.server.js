'use strict';

// const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

// const extractCss = require('./extractCss');

const outputPath = path.join(__dirname, '../tmpDist');

module.exports = {
  mode: 'none',
  // target: 'node',
  // stats: 'minimal',
  // cache: false,
  context: path.resolve(__dirname, '../'),
  // devtool: 'source-map',
  entry: {
    server: './src/server/index'
  },
  output: {
    path: outputPath,
    publicPath: '/',
    filename: 'server.js'
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   __CLIENT__: false,
    //   __SERVER__: true,
    //   __PRODUCTION__: true,
    //   __DEV__: false
    // })
  ],
  module: {
    rules: [
      {
        test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/,
        loaders: require.resolve('url-loader'),
        exclude: /node_modules/
      }, {
        test: /.(svg|scss)$/,
        loaders: require.resolve('ignore-loader'),
      }, {
        test: /\.(js|jsx)$/,
        use: [{
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            presets: [
              "env",
              "react"
            ],
            plugins: [
              'transform-runtime',
              // 'dynamic-import-node',
              // 'transform-class-properties',
              // 'transform-export-extensions',
              // 'transform-object-rest-spread',
              // 'transform-decorators-legacy',
            ],
          }
        }]
      }],
  },
  externals: [nodeExternals()],
  // resolve: {
  //   modules: [
  //     'src',
  //     'node_modules',
  //     'static'
  //   ],
  //   extensions: ['.json', '.js', '.jsx']
  // },
};
