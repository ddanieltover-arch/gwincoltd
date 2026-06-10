import fs from "fs";

const t = fs.readFileSync("src/data/products.ts", "utf8");
for (const slug of ["glutinous-rice", "jasmine-rice-thai-hom-mali"]) {
  const i = t.indexOf(`"${slug}"`);
  const chunk = t.slice(i, i + 12000);
  const imgs = [...chunk.matchAll(/src=\\"([^"\\]+)\\"/g)].map((m) => m[1]);
  console.log(slug, imgs);
}
