// gulp
const { src, dest, watch, series, parallel } = require('gulp');

// cmd
const cmd = require('node-cmd');

// scss dependencies
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// typescript dependencies
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');


const path = { 
  scss: 'src/scss/**/*.scss',
  ts: 'src/ts/**/*.ts',
  images: 'src/images/**/*.{png,jpeg,jpg}'
};


// tasks
function scssTask(){  
  return (
    src([path.scss])     
      .pipe(sass())
      .pipe(postcss([autoprefixer(), cssnano({zindex: false})]))
      .pipe(concat('styles.css'))
      .pipe(dest('./'))
  );
}


function tsTask(){
  return browserify({
    basedir: ".",
    debug: true,
    entries: ["src/ts/main.ts"],
    cache: {},
    packageCache: {},
  })
    .plugin(tsify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(dest("."));
}


async function imageTask(){  
  cmd.run('python convert.py', function(err, data, stderr){
    console.log(data)
  })
}


// watchers
function watchScssPath(){
  watch([path.scss], scssTask);
}

function watchImagePath(){
  watch([path.images], imageTask);
}

function watchTsPath(){
  watch([path.ts], tsTask);
}

exports.default = series(
  parallel(scssTask, tsTask, imageTask),
  parallel(watchImagePath, watchScssPath)
);