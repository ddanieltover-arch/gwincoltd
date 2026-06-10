import fs from "fs";
import path from "path";

const t = fs.readFileSync("src/data/products.ts", "utf8");
const urls = [...t.matchAll(/(?:src|data-src|data-webp)=\\"([^"\\]+)\\"/g)].map(
  (x) => x[1],
);
const unique = [...new Set(urls)];
const missing = unique
  .filter((s) => s.startsWith("/uploads/"))
  .filter((s) => !fs.existsSync(`public${s}`));
const external = unique.filter((s) => s.startsWith("http"));

const externalMissing = external.filter((url) => {
  const filename = url.split("?")[0].split("@")[0].split("/").pop() ?? "";
  const base = filename.replace(/\.[^.]+$/, "");
  const found = fs
    .readdirSync("public/uploads", { recursive: true })
    .some((f) => typeof f === "string" && f.includes(base));
  return !found;
});

console.log("unique image attrs:", unique.length);
console.log("missing local:", missing.length);
missing.forEach((s) => console.log(" ", s));
console.log("external (unique):", external.length);
console.log("external without local copy:", externalMissing.length);
