import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
const parser = new MarkdownIt();

export async function GET(context) {
  const blog = await getCollection("posts");
  return rss({
    title: "DoneBySimon",
    description: "Things done, by Simon.",
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      content: sanitizeHtml(parser.render(post.body)),
      link: post.data.permalink,
    })),
  });
}
