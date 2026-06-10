import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXTRACTED = path.resolve(__dirname, "../src/data/wp-extracted.json");
const OUT = path.resolve(__dirname, "../src/data/pages.ts");

function stripTags(html) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#0?39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function stripShortcodes(html) {
  return html.replace(/\[[^\]]*\]/g, " ").replace(/\s+/g, " ").trim();
}

function extractHtmlSections(html) {
  const cleaned = stripShortcodes(html);
  const sections = [];
  const regex = /<h2[^>]*>(.*?)<\/h2>(.*?)(?=<h2|$)/gis;
  let match;
  while ((match = regex.exec(cleaned)) !== null) {
    const title = stripTags(match[1]);
    const body = stripTags(match[2]);
    if (title && body) sections.push({ title, body });
  }
  return sections;
}

function extractAboutContent(html) {
  const cleaned = stripShortcodes(html);

  const intro =
    stripTags(
      cleaned.match(
        /<p>Nestled in fertile lands[\s\S]*?<\/p>/i,
      )?.[0] ?? "",
    ) || null;

  const companyIntro =
    stripTags(
      cleaned.match(
        /<p[^>]*>[\s\S]*?<strong>Global Win Co\. Ltd®<\/strong>[\s\S]*?<\/p>/i,
      )?.[0] ?? "",
    ) || null;

  const pillars = [
    {
      title: "Our Commitment",
      body: stripTags(
        cleaned.match(
          /<h2[^>]*>\s*<strong>Our Commitment<\/strong>[\s\S]*?<\/h2>\s*<p>([\s\S]*?)<\/p>/i,
        )?.[1] ?? "",
      ),
    },
    {
      title: "Our Promise",
      body: stripTags(
        cleaned.match(
          /<b>Our\s*Promise<\/b>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i,
        )?.[1] ?? "",
      ),
    },
    {
      title: "Our Mission",
      body: stripTags(
        cleaned.match(
          /Our Mission<\/h2>\s*<p[^>]*>([\s\S]*?)<\/p>/i,
        )?.[1] ?? "",
      ),
    },
    {
      title: "Quality Control",
      body: stripTags(
        cleaned.match(
          /Quality Control<\/strong><\/h2>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i,
        )?.[1] ?? "",
      ),
    },
    {
      title: "Multi-Commodity Trading",
      body: stripTags(
        cleaned.match(
          /<strong>Global Win Co Ltd®<\/strong> Markets([\s\S]*?)<\/p>/i,
        )?.[0] ?? "",
      ),
    },
  ].filter((p) => p.body);

  const closingTitle = stripTags(
    cleaned.match(
      /<h2[^>]*>(Thank you for choosing[\s\S]*?)<\/h2>/i,
    )?.[1] ?? "Thank you for choosing Global Win Co. Ltd",
  );

  const closingBody = stripTags(
    cleaned.match(
      /Thank you for choosing[\s\S]*?<\/h2>\s*<p[^>]*>([\s\S]*?)<\/p>/i,
    )?.[1] ?? "",
  );

  const introParagraphs = [];
  if (companyIntro) introParagraphs.push(companyIntro);

  return {
    heroLabel: "Who we are",
    heroTitle: "ABOUT US",
    intro: intro ?? companyIntro ?? "",
    introParagraphs,
    pillars,
    closing: {
      title: closingTitle,
      body: closingBody,
    },
  };
}

function extractPrivacyIntro(html) {
  const cleaned = stripShortcodes(html);
  const introBlock = cleaned.match(
    /<h2><strong>Privacy Policy<\/strong><\/h2>([\s\S]*?)(?=<\/col>|<h2)/i,
  )?.[1];

  if (!introBlock) return [];

  return [...introBlock.matchAll(/<div>([\s\S]*?)<\/div>/gi)]
    .map((m) => stripTags(m[1]))
    .filter((p) => p && p.length > 20);
}

const { pages } = JSON.parse(fs.readFileSync(EXTRACTED, "utf8"));
const aboutWp = pages.find((p) => p.slug === "about-us");
const privacyWp = pages.find((p) => p.slug === "privacy-policy");

if (!aboutWp || !privacyWp) {
  throw new Error("Missing about-us or privacy-policy in wp-extracted.json");
}

const about = extractAboutContent(aboutWp.contentHtml);
const privacyIntro = extractPrivacyIntro(privacyWp.contentHtml);
const privacySections = extractHtmlSections(privacyWp.contentHtml).filter(
  (s) => s.title !== "Privacy Policy",
);

const file = `import type { AboutPageContent, PrivacyPageContent } from "@/types/pages";

/** Generated from wp-extracted.json — run \`node scripts/generate-pages.mjs\` to refresh */
export const aboutPageContent: AboutPageContent = ${JSON.stringify(about, null, 2)};

export const privacyPageContent: PrivacyPageContent = ${JSON.stringify(
  {
    introParagraphs: privacyIntro,
    sections: privacySections,
  },
  null,
  2,
)};
`;

fs.writeFileSync(OUT, file, "utf8");
console.log(`Generated ${OUT}`);
console.log(`About pillars: ${about.pillars.length}`);
console.log(`Privacy sections: ${privacySections.length}`);
