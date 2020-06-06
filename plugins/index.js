module.exports = function(eleventyConfig) {

  eleventyConfig.addFilter(
      'dateDisplay',
      require('./date-display.filter')
  );

  eleventyConfig.addShortcode(
      'youtube',
      require('./youtube.shortcode')
  );
};
