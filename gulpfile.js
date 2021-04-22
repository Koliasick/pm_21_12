const { src, dest, watch, series } = require ("gulp");
const concat = require ("gulp-concat");
const sass = require ("gulp-sass");
const autoprefixer = require ("gulp-autoprefixer");
const cssnano = require ("gulp-cssnano");
const rename = require ("gulp-rename");
const uglify = require ("gulp-uglify");
const imagemin = require ("gulp-imagemin");
const bs = require('browser-sync').create();
function task_html () {
    return src ( "app/*.html")
        .pipe (dest ( "dist"));
}
exports.html = task_html;
function task_sass () {
    return src ( "app/sass/*.sass")
        .pipe (concat ( 'styles.sass'))
        .pipe (sass ())
        .pipe (autoprefixer ({
            browsers: [ 'last 2 versions'],
            cascade: false
        }))
        .pipe (cssnano ())
        .pipe (rename ({suffix: '.min'}))
        .pipe (dest ( "dist/css"));
}
exports.sass = task_sass;
function task_scripts () {
    return src ( "app/js/*.js")
        .pipe (concat ( 'scripts.js'))
        .pipe (uglify ())
        .pipe (rename ({suffix: '.min'}))
        .min
        .pipe (dest ("dist/js"));
}
exports.scripts = task_scripts;
function task_imgs() {
    return src ( ".app/img/*.+(jpg|jpeg|png|gif)")
        .pipe (imagemin ({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe (dest (".dist/images"))
}
exports.imgs = task_imgs;

function reload(done)
{
    bs.reload();
    done();
}

function task_watch() {
    watch ("app/*.html", series(task_html,reload));
    watch ("app/js/*.js", task_scripts);
    watch ("app/sass/*.sass", series(task_sass,reload));
    watch ("app/images/*.+(jpg|jpeg|png|gif)", task_imgs);
}
exports.watch = task_watch;

bs.init({
    server: "./dist"
});

exports.build = series(task_html, task_sass, task_scripts, task_imgs,
    task_watch);