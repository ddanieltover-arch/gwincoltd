import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.resolve(__dirname, "../public/uploads");
const PRODUCTS_PATH = path.resolve(__dirname, "../src/data/products.ts");

const MANUAL_MAP = {
  "2019/06/Glutinous-rice-600x450.jpg": "2024/06/Glutinous-rice-600x450-1.jpg",
  "2019/06/Thai-black-glutinous-rice-600x383.jpg":
    "2024/06/Thai-black-glutinous-rice-600x383-1.jpg",
  "2019/06/1.-Thai-hommali-jasmine-rice-600x450.jpg":
    "2024/06/1.-Thai-hommali-jasmine-rice-600x450-1.jpg",
  "2019/06/2.Hommali-RD15-600x450.jpg": "2024/06/2.Hommali-RD15-600x450-1.jpg",
};

function normalizeStem(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/-\d+x\d+$/i, "")
    .replace(/-\d+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function buildUploadIndex() {
  const byStem = new Map();
  const byFilename = new Map();

  function walk(dir, rel = "") {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const relPath = rel ? `${rel}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), relPath);
      } else if (/\.(jpe?g|png|webp|gif|avif)$/i.test(entry.name)) {
        const normalizedPath = relPath.replace(/\\/g, "/");
        const stem = normalizeStem(entry.name);
        const existing = byStem.get(stem);
        const score = entry.name.length;
        if (!existing || score < existing.score) {
          byStem.set(stem, { path: normalizedPath, score });
        }

        const baseName = entry.name.replace(/\.[^.]+$/, "").toLowerCase();
        if (!byFilename.has(baseName)) {
          byFilename.set(baseName, normalizedPath);
        }
      }
    }
  }

  walk(UPLOADS_DIR);
  return { byStem, byFilename };
}

function externalFilename(url) {
  const noQuery = url.split("?")[0].split("@")[0];
  return noQuery.split("/").pop() ?? "";
}

function resolveUploadPath(rawPath, index) {
  const cleaned = rawPath
    .replace(/^https?:\/\/[^/]+\/wp-content\/uploads\//, "")
    .replace(/^\/uploads\//, "")
    .replace(/&#0?38;/g, "&");

  if (MANUAL_MAP[cleaned]) return MANUAL_MAP[cleaned];

  const fullPath = path.join(UPLOADS_DIR, cleaned);
  if (fs.existsSync(fullPath)) return cleaned;

  const filename = externalFilename(rawPath || cleaned);
  const stem = normalizeStem(filename);
  const hit = index.byStem.get(stem);
  if (hit) return hit.path;

  const baseName = filename.replace(/\.[^.]+$/, "").toLowerCase();
  const exact = index.byFilename.get(baseName);
  if (exact) return exact;

  return cleaned;
}

const index = buildUploadIndex();
let productsTs = fs.readFileSync(PRODUCTS_PATH, "utf8");
let replacements = 0;

function rewriteAttr(match, attr, src) {
  const isLocal =
    src.includes("/uploads/") || src.includes("/wp-content/uploads/");
  const isExternalCdn = /^https?:\/\/[^/]+\//.test(src);
  if (!isLocal && !isExternalCdn) return match;

  const local = resolveUploadPath(src, index);
  const nextSrc = local.startsWith("http") ? local : `/uploads/${local}`;
  if (nextSrc === src) return match;
  replacements += 1;
  return `${attr}=\\"${nextSrc}\\"`;
}

for (const attr of ["src", "data-src", "data-webp"]) {
  const pattern = new RegExp(`${attr}=\\\\"([^"\\\\]+)\\\\"`, "g");
  productsTs = productsTs.replace(pattern, (match, src) =>
    rewriteAttr(match, attr, src),
  );
}

fs.writeFileSync(PRODUCTS_PATH, productsTs, "utf8");
console.log(`Fixed image src values: ${replacements}`);
