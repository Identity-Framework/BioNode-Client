var gulp = require('gulp')
var nodemon    = require('gulp-nodemon');
var livereload = require('gulp-livereload');

// Need to support browserify in here too.

gulp.task('develop', function () {
      nodemon({script: './bin/www', ext: 'js hjs json', legacyWatch: true });
});

gulp.task('default', 'develop');
