/* eslint strict: 0 */
'use strict';

const webpack = require('webpack');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
const baseConfig = require('./webpack.config.base');

const config = Object.create(baseConfig);

config.debug = true;

config.devtool = 'cheap-module-eval-source-map';

config.entry = [
  'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
  './app/index'
];

config.output.publicPath = 'http://localhost:3000/dist/';

config.module.loaders.push({
  test: /^((?!\.module).)*\.styl$/,
  loaders: [
    'style-loader',
    'css-loader',
    'stylus-loader'
  ]
}, {
  test: /\.module\.styl/,
  loaders: [
    'style-loader',
    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!',
    'stylus-loader'
  ]
});


config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development')
    }
  })
);

// when 2.0 is stable, might be worth checking the electron-renderer target
// https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js#L150
config.target = webpackTargetElectronRenderer(config);

module.exports = config;
