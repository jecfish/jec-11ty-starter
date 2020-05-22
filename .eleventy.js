module.exports = function (eleventyConfig) {

  // set browser sync config to support .html clean url routing
  eleventyConfig.setBrowserSyncConfig(
    require('./configs/browsersync.config')('dist')
  );
  
  // set copy asset folder to dist
  eleventyConfig.addPassthroughCopy('assets');

  // set input and output folder
  return {
    dir: { input: 'src', output: 'dist' },
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
}