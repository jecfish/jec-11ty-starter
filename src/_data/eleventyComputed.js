module.exports = {
  permalink:
    '{% set p = page.filePathStem | replace("/root/", "/") %}' +
    '{{ permalink or (p + ".html") }}'
};
