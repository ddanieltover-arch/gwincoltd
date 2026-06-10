import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SQL_PATH = path.resolve(
  __dirname,
  "../../../../sql/u196234866_i5Wfk.sql",
);
const OUT_PATH = path.resolve(__dirname, "../src/data/wp-extracted.json");

function parseMysqlValues(line) {
  let s = line.trim();
  if (s.startsWith("(")) s = s.slice(1);
  if (s.endsWith("),")) s = s.slice(0, -2);
  else if (s.endsWith(")")) s = s.slice(0, -1);

  const fields = [];
  let i = 0;

  while (i < s.length) {
    if (s[i] === "'") {
      i += 1;
      let val = "";
      while (i < s.length) {
        const ch = s[i];
        if (ch === "\\") {
          const next = s[i + 1];
          if (next === "r") {
            val += "\r";
            i += 2;
          } else if (next === "n") {
            val += "\n";
            i += 2;
          } else if (next === "t") {
            val += "\t";
            i += 2;
          } else if (next === "0") {
            val += "\0";
            i += 2;
          } else {
            val += next ?? "";
            i += 2;
          }
        } else if (ch === "'" && s[i + 1] === "'") {
          val += "'";
          i += 2;
        } else if (ch === "'") {
          i += 1;
          break;
        } else {
          val += ch;
          i += 1;
        }
      }
      fields.push(val);
      if (s[i] === ",") i += 1;
    } else if (s.slice(i, i + 4) === "NULL") {
      fields.push(null);
      i += 4;
      if (s[i] === ",") i += 1;
    } else {
      const start = i;
      while (i < s.length && s[i] !== ",") i += 1;
      fields.push(s.slice(start, i).trim());
      if (s[i] === ",") i += 1;
    }
  }

  return fields;
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#0?39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeWpHtml(html) {
  return html
    .replace(/\r\n/g, "\n")
    .replace(/&#0?38;/g, "&")
    .replace(/â€"/g, "–")
    .replace(/â€™/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€/g, '"')
    .replace(/Â /g, " ")
    .replace(/Â/g, "");
}

function rewriteImageUrls(html) {
  return html
    .replace(/https?:\/\/gwincoltd\.com\/wp-content\/uploads\//g, "/uploads/")
    .replace(/https?:\/\/[^"'\s>]+\/wp-content\/uploads\//g, "/uploads/");
}

const sql = fs.readFileSync(SQL_PATH, "utf8");
const lines = sql.split("\n");

const posts = [];
const postmeta = [];
const attachments = new Map();

for (const line of lines) {
  if (!line.startsWith("(")) continue;

  if (line.includes(",0,'product',") || line.includes(",0,'page',")) {
    const fields = parseMysqlValues(line);
    if (fields.length < 22) continue;
    const postType = fields[20];
    if (postType !== "product" && postType !== "page") continue;
    if (fields[7] !== "publish") continue;

    posts.push({
      id: Number(fields[0]),
      content: normalizeWpHtml(fields[4] ?? ""),
      title: fields[5] ?? "",
      excerpt: normalizeWpHtml(fields[6] ?? ""),
      slug: fields[11] ?? "",
      type: postType,
    });
  }

  if (line.includes(",'_thumbnail_id',") || line.includes(",'_product_image_gallery',")) {
    const fields = parseMysqlValues(line);
    if (fields.length >= 4) {
      postmeta.push({
        postId: Number(fields[1]),
        key: fields[2],
        value: fields[3],
      });
    }
  }

  if (line.includes(",0,'attachment',")) {
    const fields = parseMysqlValues(line);
    if (fields.length >= 22 && fields[7] === "inherit") {
      const guid = fields[18] ?? "";
      const match = guid.match(/wp-content\/uploads\/(.+)$/);
      if (match) {
        attachments.set(Number(fields[0]), match[1]);
      }
    }
  }
}

const metaByPost = new Map();
for (const m of postmeta) {
  if (!metaByPost.has(m.postId)) metaByPost.set(m.postId, {});
  metaByPost.get(m.postId)[m.key] = m.value;
}

const products = posts
  .filter((p) => p.type === "product")
  .map((p) => {
    const meta = metaByPost.get(p.id) ?? {};
    const thumbId = meta._thumbnail_id ? Number(meta._thumbnail_id) : null;
    const galleryIds = meta._product_image_gallery
      ? meta._product_image_gallery.split(",").map(Number).filter(Boolean)
      : [];

    const excerptPlain = stripHtml(p.excerpt);
    const contentPlain = stripHtml(p.content);
    const summary =
      excerptPlain.slice(0, 300) ||
      contentPlain.slice(0, 300) ||
      p.title;

    return {
      slug: p.slug,
      name: p.title,
      description: summary,
      descriptionHtml: rewriteImageUrls(p.content),
      excerptHtml: rewriteImageUrls(p.excerpt),
      wpThumbnail: thumbId ? attachments.get(thumbId) ?? null : null,
      wpGallery: galleryIds
        .map((id) => attachments.get(id))
        .filter(Boolean),
    };
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));

const pages = posts
  .filter((p) => p.type === "page")
  .map((p) => ({
    slug: p.slug,
    title: p.title,
    contentHtml: rewriteImageUrls(p.content),
    contentPlain: stripHtml(p.content).slice(0, 500),
  }))
  .sort((a, b) => a.slug.localeCompare(b.slug));

const output = {
  extractedAt: new Date().toISOString(),
  source: "u196234866_i5Wfk.sql",
  productCount: products.length,
  pageCount: pages.length,
  products,
  pages,
};

fs.writeFileSync(OUT_PATH, JSON.stringify(output, null, 2), "utf8");
console.log(`Extracted ${products.length} products and ${pages.length} pages`);
console.log(`Written to ${OUT_PATH}`);

const slugs = products.map((p) => p.slug);
console.log("Product slugs:", slugs.join(", "));
