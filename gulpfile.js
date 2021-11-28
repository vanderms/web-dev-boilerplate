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


