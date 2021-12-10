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



const path = { 
  scss: 'src/**/*.scss',
  js: 'src/**/*.js',
  images: 'src/images/**/*.{png,jpeg,jpg}'
};


// tasks
function scssTask(){  
  return (
    src('src/scss/index.scss')     
      .pipe(sass())
      .on('error', function (err) {
        console.log(err.toString());       
        this.emit('end');
      })
      .pipe(postcss([autoprefixer(), cssnano({zindex: false})]))
      .pipe(concat('styles.css'))
      .pipe(dest('./'))
  );
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

exports.default = series(
  parallel(scssTask, imageTask),
  parallel(watchImagePath, watchScssPath)
);