const sass = require("sass");
const StepCard = require("./views/_includes/components/StepCard");
const Button = require("./views/_includes/components/Button");

module.exports = function (eleventyConfig) {
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addWatchTarget("**/*.scss");
  // Creates the extension for use
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css", // optional, default: "html"

    // `compile` is called once per .scss file in the input directory
    compile: async function (inputContent) {
      let result = sass.compileString(inputContent);

      // This is the render function, `data` is the full data cascade
      return async (data) => {
        return result.css;
      };
    },
  });

  eleventyConfig.addPassthroughCopy("views/assets");

  eleventyConfig.addShortcode("StepCard", StepCard);
  eleventyConfig.addShortcode("Button", Button);

  // Return your Object options:
  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "views",
      output: "_site",
    },
  };
};
