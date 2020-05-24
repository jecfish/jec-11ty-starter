
const env = require('./env');

module.exports = {
  permalink:
    '{% set p = page.filePathStem | replace("/root/", "/") %}' +
    '{{ permalink or (p + ".html") }}',
  cover: (data) => {
    let img = data.cover || (data.page.filePathStem + '.jpg');
    img = img.startsWith('/') ? img.substr(1, img.length - 1) : img;
    return new URL(img, env.base.img).href;
  },
};
