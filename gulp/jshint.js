var jshint = require('gulp-jshint');
var gulp   = require('gulp');
var conf = require('./conf');
var path = require('path');
var stylish = require('jshint-stylish');
 
gulp.task('jshint', function() {
  return gulp.src(path.join(conf.paths.src, '/**/*.js'))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
