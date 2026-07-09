import rss from "@astrojs/rss";
import { getImage } from "astro:assets";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import { getContentImage } from "../lib/content-assets.js";

const parser = new MarkdownIt();

// Feed readers cannot resolve relative paths, so every image has to become an absolute URL.
async function absoluteImageUrl(reference, site) {
  const image = getContentImage(reference);
  if (!image) return null;

  // Re-encoding a GIF through sharp drops its animation, so those are linked as-is.
  const resolved =
    image.format === "gif"
      ? image
      : await getImage({
          src: image,
          width: Math.min(800, image.width),
          format: "webp",
        });

  return new URL(resolved.src, site).href;
}

async function renderContent(post, site) {
  const html = parser.render(post.body);

  const references = new Set(
    [...html.matchAll(/<img [^>]*src="([^"]+)"/g)].map((match) => match[1])
  );

  const urls = new Map();
  for (const reference of references) {
    const url = await absoluteImageUrl(reference, site);
    if (url) urls.set(reference, url);
  }

  const withAbsoluteImages = html.replace(
    /(<img [^>]*src=")([^"]+)(")/g,
    (match, before, reference, after) =>
      urls.has(reference) ? `${before}${urls.get(reference)}${after}` : match
  );

  return sanitizeHtml(withAbsoluteImages, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
  });
}

export async function GET(context) {
  const posts = await getCollection("posts");
  posts.sort((a, b) => +b.data.date - +a.data.date);

  const items = await Promise.all(
    posts.map(async (post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      content: await renderContent(post, context.site),
      link: `/${post.data.permalink}`,
    }))
  );

  return rss({
    title: "DoneBySimon",
    description: "Things done, by Simon.",
    site: context.site,
    items,
    customData: "<language>en</language>",
  });
}
