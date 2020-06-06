const env = require('./src/_data/env');

module.exports = function (eleventyConfig) {

  // set browser sync config to support .html clean url routing
  eleventyConfig.setBrowserSyncConfig(
    require('./configs/browsersync.config')(env.folder.output)
  );
  
  // set copy asset folder to dist
  eleventyConfig.addPassthroughCopy(env.folder.assets);
  eleventyConfig.addPassthroughCopy(`${env.folder.input}/favicon.ico`);

  // add plugins
  eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-rss'));
  eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'));
  eleventyConfig.addPlugin(require('./plugins'));

  // set input and output folder
  return {
    dir: { input: env.folder.input, output: env.folder.output },
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
}