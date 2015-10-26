var fs = require('fs');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('dev', function() {
  return gulp.src('./src/index.js')
    .pipe(rename('stub-queue.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', function() {
  return gulp.src('./src/index.js')
    .pipe(uglify({
      compress: {
        screw_ie8: true,
        warnings: false,
        side_effects: true,
  			sequences: true,
        dead_code: true,
  			drop_debugger: true,
  			comparisons: true,
  			conditionals: true,
  			evaluate: true,
  			booleans: true,
  			loops: true,
  			unused: true,
  			hoist_funs: true,
  			if_return: true,
  			join_vars: true,
  			cascade: true,
        drop_console: true,
        properties: true
      },
      output: {
        comments: false
      },
      mangle: true
    }))
    .pipe(rename('stub-queue.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['dev', 'build']);
