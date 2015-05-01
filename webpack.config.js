'use strict';

var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer-core');

function createLibPath (lib) {
  return path.resolve('src', 'common', 'scripts', 'libs', lib);
}

module.exports = {
  context: path.resolve('./src'),
  output: {
    filename: 'assets/kj-[hash].js'
  },
  recordsOutputPath: path.resolve('./records.json'),
  resolve: {
    alias: {
      'common-assets': path.resolve('src', 'common'),
      noop: path.resolve('src', 'common', 'scripts', 'noop')
    }
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?optional=runtime' },
      { test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!stylus-loader') },
      { test: /\.hbs$/, loader: 'handlebars-loader' },
      { test: /\.png$/, loader: 'url-loader?prefix=img/&limit=5000' },
      { test: /\.jpg$/, loader: 'url-loader?prefix=img/&limit=5000' },
      { test: /\.gif$/, loader: 'url-loader?prefix=img/&limit=5000' },
      { test: /\.woff$/, loader: 'url-loader?prefix=font/&limit=5000' },
      { test: /\.eot$/, loader: 'file-loader?prefix=font/' },
      { test: /\.ttf$/, loader: 'file-loader?prefix=font/' },
      { test: /\.svg$/, loader: 'file-loader?prefix=font/' }
    ]
  },
  plugins: [
    new ExtractTextPlugin('assets/kj-[contenthash].css'),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 20 })
  ],
  postcss: [ autoprefixer({ browsers: [ 'Chrome >= 33', 'IE >= 8' ] }) ]
};
