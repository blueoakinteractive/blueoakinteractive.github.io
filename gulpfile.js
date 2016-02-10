var gulp         = require('gulp');
var browserSync = require('browser-sync').create();
var reload       = browserSync.reload;
var plugins      = require('gulp-load-plugins')();

var jsPaths = [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/jquery/dist/jquery.js',
  'bower_components/velocity/velocity.min.js',
  'bower_components/velocity/velocity.ui.min.js',
  'bower_components/what-input/what-input.js',
  'bower_components/foundation-sites/dist/foundation.js',
  'src/js/app.js'
];

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

// JS Task
gulp.task('js', function() {
  return gulp.src(jsPaths)
    .pipe(plugins.uglify())
    .pipe(plugins.concat('app.min.js'))
    .pipe(gulp.dest('dist/js'));
});

// SASS Task
gulp.task('sass', function() {
  return gulp.src('src/scss/app.scss')
    .pipe(plugins.sass({
      includePaths: sassPaths
    })
    .on('error', plugins.sass.logError))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(plugins.minifyCss())
    .pipe(plugins.sourcemaps.write('/'))
    .pipe(gulp.dest('dist/css'))

    // Reload browser
    .pipe(reload({stream: true}));
});

// Browser Sync Task
gulp.task('browser-sync', function() {
  browserSync.init({
    server: './',
    port: 3000,
    ui: {
      port: 3001,
      weinre: {
        port: 3002
      }
    }
  })
});

// Watch Task - Watches key files for changes.
gulp.task('watch', function(){
  gulp.watch('src/**/*', ['js', 'sass']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

// Default Task - Run browser-sync and watch for changes.
gulp.task('default', ['browser-sync', 'watch']);
