'use strict';

const path = require('path');
const webpack = require('webpack');

const AssetsPlugin = require('assets-webpack-plugin');

const MAX_AGE = 2592000;


module.exports = {
  mode: 'none',
  // devtool: 'cheap-module-source-map',
  context: path.resolve(__dirname, '../'),

  entry: {
    home: './src/client/entry/home.js',
  },
  output: {
    path: path.join(__dirname, '../static/dist'),
    filename: '[name].[chunkhash:12].js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: `[name].[id].[chunkhash:12].js?max_age=${MAX_AGE}`,
    // This is the URL that app is served from. We use "/" in development.
    publicPath: '/dist/',
  },
  resolve: {
    modules: [
      'src',
      'node_modules',
      'static'
    ],
    extensions: ['.js', '.jsx'],
    alias: {

      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
      'src': path.join(__dirname, '../src'),
    }
  },
  module: {
    rules: [
      /*
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),

            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },*/
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // Process JS with Babel.
          {
            test: /\.(js|jsx)$/,
            include: [
              path.join(__dirname, '../src'),
            ],
            loader: require.resolve('babel-loader'),
            options: {
              'presets': [
                "env",
                "react"
              ],
              plugins: ['transform-runtime'],
              cacheDirectory: true,
            },
          },
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      // ** STOP ** Are you adding a new loader?
      // Make sure to add the new loader(s) before the "file" loader.
    ],
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../tmpDist/react-manifest.json'),
    }),
    new webpack.NamedModulesPlugin(),
    new AssetsPlugin({
      path: path.join(__dirname, '../tmpDist'),
      filename: 'assets.json',
      update: true,
    })
  ],
};
