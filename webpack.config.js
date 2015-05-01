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
    filename: 'kj-[hash].js'
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
      { test: /\.json$/, loader: 'json' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel?optional=runtime' },
      { test: /\.styl$/, loader: ExtractTextPlugin.extract('style', 'css!postcss!stylus') },
      { test: /\.hbs$/, loader: 'handlebars', query: { inlineRequires: '\/images\/' } },
      { test: /\.png$/, loader: 'url?prefix=img/&limit=5000' },
      { test: /\.jpg$/, loader: 'url?prefix=img/&limit=5000' },
      { test: /\.woff(2)?$/, loader: 'url?prefix=font/&limit=5000' },
      { test: /\.eot$/, loader: 'file?prefix=font/' },
      { test: /\.ttf$/, loader: 'file?prefix=font/' },
      { test: /\.svg$/, loader: 'file?prefix=font/' }
    ]
  },
  plugins: [
    new ExtractTextPlugin('kj-[contenthash].css'),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 20 })
  ],
  postcss: [ autoprefixer({ browsers: [ 'Chrome >= 33', 'IE >= 8' ] }) ]
};
