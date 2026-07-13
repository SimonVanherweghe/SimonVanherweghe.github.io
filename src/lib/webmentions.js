const API = "https://webmention.io/api/mentions.jf2";
const DOMAIN = "donebysimon.be";
const PER_PAGE = 100;
// webmention.io documents no per-page maximum; cap pagination so a broken
// response can never loop the build forever.
const MAX_PAGES = 20;

// Every rendered post page asks for its mentions, but the domain-wide feed
// only needs to be fetched once per build.
let mentionsPromise;

export function getAllWebmentions() {
  mentionsPromise ??= fetchAndGroup();
  return mentionsPromise;
}

export async function getWebmentionsForUrl(url) {
  const byTarget = await getAllWebmentions();
  return byTarget.get(normalizeUrl(url)) ?? [];
}

// Senders may use http/https, www or no trailing slash for the same post;
// collapse those variants onto one key.
export function normalizeUrl(url) {
  try {
    const u = new URL(url);
    const path = u.pathname.endsWith("/") ? u.pathname : `${u.pathname}/`;
    return u.hostname.replace(/^www\./, "") + path;
  } catch {
    return url;
  }
}

async function fetchAndGroup() {
  const token =
    import.meta.env?.WEBMENTION_IO_TOKEN ?? process.env.WEBMENTION_IO_TOKEN;
  const byTarget = new Map();

  if (!token) {
    console.warn(
      "[webmentions] WEBMENTION_IO_TOKEN not set; building without webmentions.",
    );
    return byTarget;
  }

  try {
    const seen = new Set();
    for (let page = 0; page < MAX_PAGES; page++) {
      const url = `${API}?domain=${DOMAIN}&token=${token}&per-page=${PER_PAGE}&page=${page}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
      if (!res.ok) throw new Error(`webmention.io responded ${res.status}`);

      const { children = [] } = await res.json();
      for (const mention of children) {
        if (mention["wm-private"] || seen.has(mention["wm-id"])) continue;
        seen.add(mention["wm-id"]);

        const key = normalizeUrl(mention["wm-target"]);
        if (!byTarget.has(key)) byTarget.set(key, []);
        byTarget.get(key).push(mention);
      }

      if (children.length < PER_PAGE) break;
    }
  } catch (error) {
    // The build must never fail because webmention.io is down.
    console.warn(
      `[webmentions] fetch failed, building without webmentions: ${error.message}`,
    );
    return new Map();
  }

  return byTarget;
}

export function mentionDate(mention) {
  return new Date(mention.published ?? mention["wm-received"]);
}

export function sourceNetwork(mention) {
  try {
    const source = new URL(mention["wm-source"]);
    // Bridgy backfeed sources look like https://brid.gy/comment/bluesky/…
    if (source.hostname.endsWith("brid.gy")) {
      const network = source.pathname.split("/")[2];
      if (network === "bluesky") return "Bluesky";
      if (network === "mastodon") return "Mastodon";
    }
    const authorUrl = mention.author?.url;
    if (authorUrl && new URL(authorUrl).hostname === "bsky.app") {
      return "Bluesky";
    }
    return "web";
  } catch {
    return "web";
  }
}
