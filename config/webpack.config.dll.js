
const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputPath = 'tmpDist';

module.exports = {
  mode: 'none',
  entry: {
    react: [
      'react',
      'react-dom',
      // 'redux',
      // 'react-redux',
      // 'redux-thunk',
    ]
  },
  output: {
    filename: '[name]-dll.[chunkhash:4].js',
    path: path.join(__dirname, '../static/dist/'),
    publicPath: '/dist/',

    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]_lib',
  },
  plugins: [
    new CleanWebpackPlugin(
      ['./static/dist/*'],
      {
        root: path.join(__dirname, '../')
      }
    ),
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]_lib',
      path: path.join(__dirname, '../tmpDist/[name]-manifest.json'),
    }),
    new AssetsPlugin({
      path: path.join(__dirname, '../tmpDist'),
      filename: 'assets.json',
      update: true,
    })
  ]
}
