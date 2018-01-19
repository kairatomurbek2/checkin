'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    mocha = require('gulp-mocha'),
    reload = browserSync.reload;

var path = {
    build: {
        js: 'web-application/staticfiles/js',
        css: 'web-application/staticfiles/css/'
    },
    src: {
        js: 'web-application/gulp/src/js/*.js',
        style: 'web-application/gulp/src/style/*.sass',
    },
    calendar: {
        libs: 'web-application/gulp/src/libs/vue/*.js',
        scripts: 'web-application/gulp/src/js/calendar/*.js'
    },
    watch: {
        js: 'web-application/gulp/src/js/**/*.js',
        style: 'web-application/gulp/src/style/**/*.sass'
    },
    test: 'web-application/gulp/src/js/calendar/unit/*.test.js',
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        // .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['src/style/'],
            outputStyle: 'compressed',
            // sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('calendar:build', function(){
    gulp.src(path.calendar.libs)
        .pipe(gulp.dest(path.build.js));
    gulp.src(path.calendar.scripts)
        .pipe(gulp.dest(path.build.js));
});

gulp.task('build', [
    'js:build',
    'calendar:build',
    'style:build'
]);

gulp.task('watch', function(){
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
        gulp.start('calendar:build');
    });
});

gulp.task('test', function () {
    return gulp.src([path.test], { read: false })
    .pipe(mocha({
      reporter: 'spec',
    }));
})

gulp.task('default', ['build', 'watch']);