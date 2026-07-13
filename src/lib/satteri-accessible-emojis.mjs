import { defineHastPlugin } from "satteri";
import emojiRegex from "emoji-regex";
import { gemoji } from "gemoji";

// Port of `rehype-accessible-emojis` for Astro 7's native Sätteri markdown pipeline,
// which no longer runs rehype plugins. Same output: every emoji in prose is wrapped in
// <span role="img" aria-label="…"> so screen readers announce its name instead of
// skipping it or reading codepoint soup.
const descriptions = new Map(gemoji.map(({ emoji, description }) => [emoji, description]));

// Text inside these elements is code or metadata, not prose — never wrap there.
const IGNORED_PARENTS = new Set(["title", "script", "style", "svg", "math"]);

function hasIgnoredAncestor(node, ctx) {
  let parent = ctx.parent(node);
  while (parent && parent.type !== "root") {
    if (parent.type === "element" && IGNORED_PARENTS.has(parent.tagName)) return true;
    parent = ctx.parent(parent);
  }
  return false;
}

function emojiSpan(emoji) {
  const description = descriptions.get(emoji);
  return {
    type: "element",
    tagName: "span",
    properties: {
      role: "img",
      // An emoji gemoji doesn't know still shouldn't be read out character by character.
      ...(description ? { ariaLabel: description } : { ariaHidden: "true" }),
    },
    children: [{ type: "text", value: emoji }],
  };
}

export function accessibleEmojis() {
  return defineHastPlugin({
    name: "accessible-emojis",
    text(node, ctx) {
      const regex = emojiRegex();
      if (!regex.test(node.value)) return;
      if (hasIgnoredAncestor(node, ctx)) return;

      const parts = [];
      let lastIndex = 0;
      regex.lastIndex = 0;
      for (const match of node.value.matchAll(regex)) {
        if (match.index > lastIndex) {
          parts.push({ type: "text", value: node.value.slice(lastIndex, match.index) });
        }
        parts.push(emojiSpan(match[0]));
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < node.value.length) {
        parts.push({ type: "text", value: node.value.slice(lastIndex) });
      }

      ctx.insertBefore(node, parts);
      ctx.removeNode(node);
    },
  });
}
