const { DateTime } = require("luxon");
const path = require("path");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const eleventyWebcPlugin = require("@11ty/eleventy-plugin-webc");
const { eleventyImagePlugin } = require("@11ty/eleventy-img");
const embedEverything = require("eleventy-plugin-embed-everything");
const { EleventyRenderPlugin } = require("@11ty/eleventy");

const markdownIt = require("markdown-it");
const markdownItEleventyImg = require("markdown-it-eleventy-img");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(EleventyVitePlugin);
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(embedEverything);

  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
    }).use(markdownItEleventyImg, {
      imgOptions: {
        widths: [1500, 750, 350],
        urlPath: "/img/",
        outputDir: "./dist/img/",
        formats: ["avif", "webp", "jpeg"],
      },
      globalAttributes: {
        class: "markdown-image",
        decoding: "async",
        // If you use multiple widths,
        // don't forget to add a `sizes` attribute.
        sizes: "100vw",
      },
      resolvePath: (filepath, env) =>
        path.join(path.dirname(env.page.inputPath), "..", filepath),
    })
  );

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  eleventyConfig.addFilter("dateToIso", (dateString) => {
    return new Date(dateString).toISOString();
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function (item) {
      if ("tags" in item.data) {
        let tags = item.data.tags;

        tags = tags.filter(function (item) {
          switch (item) {
            case "all":
            case "nav":
            case "post":
            case "posts":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    return [...tagSet];
  });

  eleventyConfig.addFilter("pageTags", (tags) => {
    const generalTags = ["all", "nav", "post", "posts", "archive", "project"];

    return tags
      .toString()
      .split(",")
      .filter((tag) => {
        return !generalTags.includes(tag);
      });
  });

  eleventyConfig.addFilter("excerpt", (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, "");
    return content.substr(0, content.lastIndexOf(" ", 200)) + "...";
  });

  //eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "public/CNAME" });

  // WebC
  eleventyConfig.addPlugin(eleventyWebcPlugin, {
    components: [
      // …
      // Add as a global WebC component
      "npm:@11ty/eleventy-img/*.webc",
    ],
  });

  // Image plugin
  eleventyConfig.addPlugin(eleventyImagePlugin, {
    // Set global default options
    formats: ["webp", "avif", "jpeg"],
    urlPath: "/img/",

    // Notably `outputDir` is resolved automatically
    // to the project output directory

    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data",
      layouts: "layouts",
    },
  };
};
