var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    clean = require('gulp-clean'),
    htmlmin = require('gulp-htmlmin'),
    plumber = require('gulp-plumber'),
    spriter = require('gulp-sprite2'),
    seajsCombo = require('gulp-seajs-combo'),
    config = require('./gulpconfig.json');


var _task = require('./gulp-task');
_task({
    projectName: 'seajsExample'
})

//css
gulp.task('css', function() {
    return gulp.src(config.src.css)
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.dest.css))
});


gulp.task('css-min', ['css'], function() {
    return gulp.src(config.res.css)
        .pipe(minifycss())
        .pipe(gulp.dest(config.dest.css));
});

// js

var modulePath='../module/';

gulp.task('entry', function() {
    return gulp.src(config.src.entry)
        .pipe(seajsCombo({
            map: {
              "swiper": modulePath+"swiper/swiper.js",
              "layer": modulePath+"layer/layer.js",
              "flexible": modulePath+"flexible/flexible.js",
              "fastclick": modulePath+"fastclick/fastclick.js"
            }
        }))
        .pipe(rename({
            basename: 'build'
        }))
        .pipe(gulp.dest(config.dest.js));
});

gulp.task('baseJs', function() {
    return gulp.src(config.src.baseJs)
        .pipe(concat('base.js'))
        .pipe(gulp.dest(config.dest.js));
});

gulp.task('js', function() {
    gulp.start('entry');
    gulp.start('baseJs');
});

gulp.task('js-min', function() {
    return gulp.src(config.res.js)
        .pipe(uglify())
        .pipe(gulp.dest(config.dest.js));
});

// img
gulp.task('img', function() {
    return gulp.src(config.src.img)
        .pipe(plumber())
        .pipe(gulp.dest(config.dest.img));
});

// module
gulp.task('module', function() {
    return gulp.src(config.src.module)
        .pipe(plumber())
        .pipe(gulp.dest(config.dest.module));
});

// html
gulp.task('html', function() {
    return gulp.src(config.src.html)
        .pipe(plumber())
        .pipe(gulp.dest(config.dest.html));
});

// watch
gulp.task('browserSync', function() {
    browserSync({
        files: [
            config.dest.css,
            config.dest.js,
            config.dest.img,
            config.dest.module,
            config.dest.html
        ],
        server: {
            baseDir: "./dist"
        }
    });
});


// clean
gulp.task('clean', function() {
    return gulp.src(config.src.clean, {
            read: false
        })
        .pipe(clean());
});

gulp.task('dev', ['css', 'js', 'html', 'img', 'module', 'browserSync'], function() {
    var watcher = gulp.watch(config.src.css, ['css']);
    gulp.watch(config.src.html, ['html']);
    gulp.watch(config.src.img, ['img']);
    gulp.watch(config.src.js, ['js']);
    gulp.watch(config.src.module, ['module']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['clean'], function() {
    gulp.start('dev');
});

gulp.task('pub', ['clean'], function() {
    gulp.start('css', 'concat-js', 'html', 'img', 'css-min', 'js-min');
});
