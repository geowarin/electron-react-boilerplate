/* eslint strict: 0 */
'use strict';

const webpack = require('webpack');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');


const config = Object.create(baseConfig);

config.devtool = 'source-map';

config.entry = './app/index';

config.output.publicPath = '../dist/';

config.module.loaders.push({
  test: /^((?!\.module).)*\.styl/,
  loader: ExtractTextPlugin.extract(
    'css-loader!stylus-loader'
  )
}, {
  test: /\.module\.styl$/,
  loader: ExtractTextPlugin.extract(
    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!stylus-loader'
  )
});

config.plugins.push(
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false
    }
  }),
  new ExtractTextPlugin('style.css', {allChunks: true})
);

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
