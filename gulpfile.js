'use strict';

var path = require('path');
var gulp = require('gulp');
var webpack = require('gulp-webpack-build');

var src = './src';
var dest = './build';
var webpackConfig = {
  useMemoryFs: true,
  progress: true
};
var CONFIG_FILENAME = webpack.config.CONFIG_FILENAME;

gulp.task('clean', function (cb) {
  var del = require('del');

  del('build/', cb);
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

gulp.task('move', [ 'clean' ], function () {
  return gulp
    .src('src/common/index.html')
    .pipe(gulp.dest(dest));
});

gulp.task('webpack:dev', [ 'move' ], function () {
  var webpackOptions = {
    debug: true,
    devtool: '#source-map',
    watchDelay: 200,
    entry: './hpp/scripts/index.js'
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

gulp.task('webpack:prod', [ 'move' ], function () {
  var webpackOptions = {
    entry: './hpp/scripts/index.js'
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
