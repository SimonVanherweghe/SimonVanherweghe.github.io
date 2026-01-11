// src/pages/open-graph/[...route].ts
import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";
import contentAssetMap from "../../../.astro/content-assets.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  fileURLToPath(new URL("../../..", import.meta.url))
);
const collectionEntries = await getCollection("posts");

// Map the array of content collection entries to create an object.
// Converts [{ id: 'post.md', data: { title: 'Example', description: '' } }]
// to { 'post.md': { title: 'Example', description: '' } }
const pages = Object.fromEntries(
  collectionEntries.map(({ id, data }) => [
    id,
    {
      ...data,
      // Keep the resolved absolute file path for the preview image so OG generation can read it from disk.
      previewPath: resolveContentImagePath(data.preview?.src),
    },
  ])
);

export const { getStaticPaths, GET } = await OGImageRoute({
  // Tell us the name of your dynamic route segment.
  // In this case it’s `route`, because the file is named `[...route].ts`.
  param: "route",

  // A collection of pages to generate images for.
  // The keys of this object are used to generate the path for that image.
  // In this example, we generate one image at `/open-graph/example.png`.
  pages: pages,

  // For each page, this callback will be used to customize the OpenGraph image.
  getImageOptions: (routePath, page) => {
    const logoPath = page.previewPath;

    if (!logoPath) {
      console.warn("No preview image path resolved for", routePath);
    }

    return {
      title: page.title,
      description: page.description,
      logo: logoPath
        ? {
            path: logoPath,
            size: [400],
          }
        : undefined,
    };
  },
});

function resolveContentImagePath(src: string | undefined) {
  if (!src) return undefined;

  for (const [key, value] of contentAssetMap.entries()) {
    if (value?.src !== src) continue;

    const [assetPath, query] = key.split("?");
    const importer = query
      ? new URLSearchParams(query).get("importer")
      : undefined;

    // Resolve @images alias and relative paths against the importer file.
    const normalizedAssetPath = assetPath.startsWith("@images/")
      ? assetPath.replace(/^@images\//, "src/images/")
      : assetPath;

    const baseDir = importer ? path.dirname(importer) : projectRoot;
    const absolutePath = path.resolve(
      projectRoot,
      baseDir,
      normalizedAssetPath
    );
    return absolutePath;
  }

  return undefined;
}
