'use strict';

var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('gulp-webpack-build');
var WebpackDevServer = require('webpack-dev-server');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var merge = require('deepmerge');

var src = './src';
var dest = './build';
var webpackConfig = {
  useMemoryFs: true,
  progress: true
};
var CONFIG_FILENAME = webpack.config.CONFIG_FILENAME;

gulp.task('clean', function (cb) {
  var del = require('del');

  del('src/hpp/build/', cb);
});

gulp.task('lint', function () {
  var jshint = require('gulp-jshint');
  var jscs = require('gulp-jscs');

  return gulp
    .src([ 'webpack.config.js', 'gulpfile.js', 'src/**/*.js', 'test/**/*.js' ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(jscs());
});

gulp.task('webpack:dev', [ 'clean' ], function () {
  var webpackOptions = {
    output: {
      path: path.resolve('src', 'hpp', 'build')
    },
    debug: true,
    devtool: '#source-map',
    watchDelay: 200,
    entry: './hpp/scripts/index.js',
    resolve: {
      alias: {
        'dev-module': 'common-assets/scripts/noop'
      }
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'src/common/index.html', title: 'KJ' })
    ]
  };

  return gulp
    .src(CONFIG_FILENAME)
    .pipe(webpack.configure(webpackConfig))
    .pipe(webpack.overrides(webpackOptions))
    .pipe(webpack.compile())
    .pipe(webpack.format({
      version: false,
      timings: true
    }))
    .pipe(webpack.failAfter({
      errors: true,
      warnings: true
    }))
    .pipe(gulp.dest(''));
});

gulp.task('webpack:prod', [ 'clean' ], function () {
  var webpackCore = webpack.core;

  var webpackOptions = {
    output: {
      path: path.resolve('src', 'hpp', 'build')
    },
    entry: './hpp/scripts/index.js',
    resolve: {
      alias: {
        'dev-module': 'noop'
      }
    },
    plugins: [
      new webpackCore.optimize.UglifyJsPlugin(),
      new webpackCore.optimize.DedupePlugin(),
      new HtmlWebpackPlugin({ template: 'src/common/index.html', title: 'KJ' })
    ]
  };

  return gulp
    .src(CONFIG_FILENAME)
    .pipe(webpack.configure(webpackConfig))
    .pipe(webpack.overrides(webpackOptions))
    .pipe(webpack.compile())
    .pipe(webpack.format({
      version: false,
      timings: true
    }))
    .pipe(webpack.failAfter({
      errors: true,
      warnings: false
    }))
    .pipe(gulp.dest(''))
    .on('error', function () {
      console.log('morn');
      console.log(arguments);
    });
});

gulp.task('watch', [ 'webpack' ], function () {
  gulp
    .watch(path.join(src, '**/*.*'))
    .on('change', function (event) {
      if (event.type === 'changed') {
        gulp.src(event.path, { base: path.resolve(src) })
          .pipe(webpack.closest(CONFIG_FILENAME))
          .pipe(webpack.configure(webpackConfig))
          .pipe(webpack.overrides(webpackOptions))
          .pipe(webpack.watch(function (err, stats) {
            gulp.src(this.path, { base: this.base })
              .pipe(webpack.proxy(err, stats))
              .pipe(webpack.format({
                verbose: true,
                version: false
              }))
              .pipe(gulp.dest(dest));
          }));
      }
    });
});

gulp.task('webpack-dev-server', function () {
  var webpackConfig = require(path.resolve(CONFIG_FILENAME));
  var webpackCore = webpack.core;

  var webpackOptions = {
    output: {
      path: path.resolve('src', 'hpp', 'build')
    },
    debug: true,
    devtool: '#source-map',
    watchDelay: 200,
    entry: [ 'webpack-dev-server/client?http://0.0.0.0:8080', 'webpack/hot/only-dev-server', './hpp/scripts/index.js' ],
    resolve: {
      alias: {
        'dev-module': 'common-assets/scripts/noop'
      }
    }
  };

  webpackConfig.plugins.push(new webpackCore.HotModuleReplacementPlugin());
  webpackConfig.plugins.push(new webpackCore.NoErrorsPlugin());
  webpackConfig.plugins.push(new HtmlWebpackPlugin({ template: 'src/common/index.html', title: 'KJ' }));

  // Start a webpack-dev-server
  var options = merge(webpackConfig, webpackOptions);

  var compiler = webpackCore(options);

  new WebpackDevServer(compiler, {
    contentBase: webpackOptions.output.path,
    hot: true,
    inline: true
  }).listen(8080, 'localhost', function (err) {
      if (err) {
        throw new gutil.PluginError('webpack-dev-server', err);
      }
      // Server listening
      gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/');
    });
});
