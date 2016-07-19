'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var karma = require('karma');
var mocha = require('gulp-mocha');

var pathSrcHtml = [
  path.join(conf.paths.src, '/**/*.html')
];

var pathSrcJs = [
  path.join(conf.paths.src, '/**/!(*.spec).js')
];

function runTests (singleRun, done) {
  var reporters = ['progress'];
  var preprocessors = {};

  pathSrcHtml.forEach(function(path) {
    preprocessors[path] = ['ng-html2js'];
  });

  if (singleRun) {
    pathSrcJs.forEach(function(path) {
      preprocessors[path] = ['coverage'];
    });
    reporters.push('coverage');
  }

  var localConfig = {
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: singleRun,
    autoWatch: !singleRun,
    reporters: reporters,
    preprocessors: preprocessors
  };

  var server = new karma.Server(localConfig, function(failCount) {
    done(failCount ? new Error('Failed ' + failCount + ' tests.') : null);
  });
  server.start();
}

function runServerUnitTests(done){
  var error = null;
  var testPath = path.join(conf.paths.src, 'server/**/*-spec.js');
  console.log('Running tests matching path pattern: ' + testPath);

  gulp.src(testPath, {read: false})
    .pipe(mocha())
    .once('error', function(e){
      error = e;
    });

  done(error);
}

gulp.task('test', ['scripts'], function(done) {
  runTests(true, done);
});

gulp.task('test-server', ['scripts'], function(done){
  runServerUnitTests(done);
});

gulp.task('test:auto', ['watch'], function(done) {
  runTests(false, done);
});
