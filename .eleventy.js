module.exports = function (eleventyConfig) {
  
  // set copy asset folder to dist
  eleventyConfig.addPassthroughCopy('assets');

  // set input and output folder
  return {
    dir: { input: 'src', output: 'dist' },
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
}