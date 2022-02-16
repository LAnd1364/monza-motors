const { src, dest, watch, parallel, series } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const concat         = require('gulp-concat');
const autoprefixer   = require('gulp-autoprefixer');
const uglify         = require('gulp-uglify');
const imagemin       = require('gulp-imagemin');
const nunjucksRender = require('gulp-nunjucks-render');
const del            = require('del');
const rename         = require('gulp-rename');
const browserSync    = require('browser-sync').create();


function browsersync() {
   browserSync.init({
      server: {
         baseDir: 'app/'
      },
      notify: false
   })
}

function styles() {
   return src('app/scss/*.scss')
   .pipe(sass({outputStyle: 'compressed'}))
   .pipe(rename({
      suffix: '.min'
   }))
   .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
   }))
   .pipe(dest('app/css'))
   .pipe(browserSync.stream())
}

function scripts() {
   return src([
      'app/js/main.js'
   ])
   .pipe(concat('main.min.js'))
   .pipe(uglify())
   .pipe(dest('app/js'))
   .pipe(browserSync.stream())
}

function images() {
   return src('app/images/**/*.*')
   .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
      })
    ]))
   .pipe(dest('docs/images'))
}

function nunjucks() {
   return src('app/*.njk')
   .pipe(nunjucksRender())
   .pipe(dest('app'))
   .pipe(browserSync.stream())
}

function build() {
   return src([
      'app/**/*.html',
      'app/css/style.min.css',
      'app/js/main.min.js'       
   ], {base: 'app'})
   .pipe(dest('docs'))
}

function cleanDist() {
   return del('docs')
}

function watching() {
   watch(['app/**/*.scss'], styles);
   watch(['app/**/*.njk'], nunjucks);
   watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
   watch(['app/**/*.html']).on('change', browserSync.reload);
}


exports.styles      = styles;
exports.scripts     = scripts;
exports.browsersync = browsersync;
exports.watching    = watching;
exports.images      = images;
exports.nunjucks    = nunjucks;
exports.cleanDist   = cleanDist;

exports.build       = series (cleanDist, images, build);

exports.default     = parallel (nunjucks, styles, scripts, browsersync, watching);