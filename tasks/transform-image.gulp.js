const { src, dest, series, parallel } = require('gulp');
const chalk = require('chalk');
const Jimp = require('jimp');
const imageminWebp = require('imagemin-webp');
const through2 = require('through2');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const changed = require('gulp-changed');

const ASSETS_DIR = '../assets';
const EXCLUDE_SRC_GLOB = `!(favicon*|*-256)`;

/** resize images to input width
 * (only when images in "from" folder changed)
 * folder in "assets"
 * @param {string} from - input folder (file glob)
 * @param {string} to - output folder
 * @param {number} width - expect output width
 */
function resize(from, to, width) {
  const SRC = `${ASSETS_DIR}/${from}/**/${EXCLUDE_SRC_GLOB}*.{jpg,png}`;
  const DEST = `${ASSETS_DIR}/${to}`;

  console.log(
    chalk.bold('Resize from', chalk.underline(SRC), 'to', chalk.underline(DEST))
  );

  return function resizeImage() {
    const quality = 80;
    return src(SRC)
      .pipe(changed(DEST))
      .pipe(
        through2.obj(async function (file, _, cb) {
          if (file.isBuffer()) {
            const img = await Jimp.read(file.contents);
            const smallImg = img.resize(width, Jimp.AUTO).quality(quality);
            const content = await smallImg.getBufferAsync(Jimp.AUTO);

            file.contents = Buffer.from(content);
          }
          cb(null, file);
        })
      )
      .pipe(dest(DEST));
  };
}

/** convert images to webp
 * (only when images in "from" folder changed)
 * folder in "assets"
 * @param {string} from - input folder (file glob)
 * @param {string} to - output folder
 * @param {string} extension - optional, default is "webp"
 */
function convert(from, to, extension = 'webp') {
  const SRC = `${ASSETS_DIR}/${from}/**/${EXCLUDE_SRC_GLOB}*.{jpg,png}`;
  const DEST = `${ASSETS_DIR}/${to}`;

  console.log(
    chalk.bold(
      'Convert from',
      chalk.underline(SRC),
      'to',
      chalk.underline(DEST)
    )
  );

  return function convertWebp() {
    return src(SRC)
      .pipe(changed(DEST, { extension: `.${extension}` }))
      .pipe(imagemin([imageminWebp({ quality: 80 })]))
      .pipe(
        rename({
          extname: `.${extension}`,
        })
      )
      .pipe(dest(DEST));
  };
}

// run resize then parellelly run 2 converts
// result: create img-500, webp, webp-500 folders under assets folder
exports.default = series(
  resize('img', 'img-500', 500),
  parallel(convert('img', 'webp'), convert('img-500', 'webp-500'))
);
