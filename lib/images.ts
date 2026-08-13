import fs from "node:fs";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg"]);

function listImageFiles(dir: string): string[] {
  const abs = path.join(process.cwd(), "public", "images", dir);
  if (!fs.existsSync(abs)) return [];

  return fs
    .readdirSync(abs)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

/** Returns the public URL of the first image found in /public/images/{dir}, or null. */
export function getFirstImage(dir: string): string | null {
  const files = listImageFiles(dir);
  return files.length ? `/images/${dir}/${files[0]}` : null;
}

export type GalleryImage = {
  src: string;
  alt: string;
};

/** Returns every image in /public/images/{dir} as { src, alt }, alt derived from the filename. */
export function getAllImages(dir: string): GalleryImage[] {
  return listImageFiles(dir).map((file) => {
    const name = path.basename(file, path.extname(file));
    const alt = name
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return { src: `/images/${dir}/${file}`, alt };
  });
}
