const { src, dest, parallel } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const jsMinify = require('terser').minify;
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const env = require('../src/_data/env');

const OUTPUT_DIR = env.folder.output;
const ASSETS_DIR = env.folder.assets;

function minifyCss () {
  return src(`../${OUTPUT_DIR}/${ASSETS_DIR}/css/*.css`)
    .pipe(cleanCSS())
    .pipe(dest(`../${OUTPUT_DIR}/${ASSETS_DIR}/css`));
};

function minifyJs () {
  return src(`../${OUTPUT_DIR}/${ASSETS_DIR}/js/*.js`)
    .pipe(terser({ warnings: true }))
    .pipe(dest(`../${OUTPUT_DIR}/${ASSETS_DIR}/js`));
};

function minifyHtml() {
  return src(`../${OUTPUT_DIR}/**/*.html`)
    .pipe(
      htmlmin({
        // options offered by the library (lib)
        collapseWhitespace: true,
        useShortDoctype: true,
        removeComments: true,
        // lib supports inline CSS minification too
        minifyCSS: true,
        // lib support inline JS minifcation as well
        // with a catch, so we need to use terser instead
        minifyJS: (text, _) => {
          const res = jsMinify(text, { warnings: true });
          if (res.warnings) console.log(res.warnings);
          if (res.error) {
            console.log(text);
            throw res.error;
          }
          return res.code;
        },
      })
    )
    .pipe(dest(`../${OUTPUT_DIR}`));
}

exports.default = parallel(minifyHtml, minifyCss, minifyJs);
