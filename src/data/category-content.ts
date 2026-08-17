import type { ProductCategory } from "@/types";

export interface CategoryContent {
  answerCapsule: string;
  intro: string;
  highlights: string[];
}

export const categoryContent: Record<ProductCategory, CategoryContent> = {
  rice: {
    answerCapsule:
      "Global Win Co. Ltd exports premium Thai rice varieties including Jasmine (Hom Mali), 1121 Sella Basmati, parboiled, long-grain, glutinous, and specialty cargo rice — all available for wholesale export with flexible bulk packaging and international shipping.",
    intro:
      "Thailand is one of the world's largest rice exporters, and our catalog covers the full spectrum of export-grade varieties. From aromatic Jasmine rice prized in global retail markets to parboiled and broken rice for industrial food processing, each product meets rigorous quality specifications.",
    highlights: [
      "Thai Hom Mali (Jasmine) with distinctive floral aroma",
      "1121 Sella Basmati with 8.2–8.4 mm grain length",
      "Parboiled, glutinous, Japonica, and brown rice options",
      "Bulk sacks (25–50 kg) and retail packaging available",
    ],
  },
  sugar: {
    answerCapsule:
      "We supply ICUMSA-certified refined cane and beet sugars from Thailand — including ICUMSA 45 white refined sugar, ICUMSA 100/150 grades, brown cane sugar (ICUMSA 600–1200), VHP sugar, and organic white cane sugar for global B2B buyers.",
    intro:
      "Our sugar portfolio covers the full ICUMSA spectrum for food, beverage, confectionery, and industrial applications. Each grade is sourced from certified mills and processed to meet international export standards with detailed technical specifications.",
    highlights: [
      "ICUMSA 45 premium white refined sugar",
      "Brown cane sugar with natural molasses content",
      "Beet sugar and VHP raw sugar options",
      "Sparkling white crystals with documented polarity specs",
    ],
  },
  fertilizer: {
    answerCapsule:
      "Global Win exports agricultural fertilizers including NPK compounds, urea (46% nitrogen), DAP, MAP, ammonium sulfate, superphosphate, and micronutrient blends — suitable for crop nutrition programs and industrial agriculture worldwide.",
    intro:
      "Fertilizer products are essential inputs for global food production. We supply nitrogen, phosphorus, and potassium compounds in granule and powder forms, with specifications aligned to international agricultural standards.",
    highlights: [
      "Urea with up to 46% nitrogen content",
      "NPK compound fertilizers in standard and custom ratios",
      "Phosphate fertilizers: DAP, MAP, monopotassium phosphate",
      "Automotive-grade urea (AdBlue/DEF) also available",
    ],
  },
  oils: {
    answerCapsule:
      "We export refined vegetable oils including refined soybean oil (RSBO) meeting international food standards (Codex, ISO, Turkish Standard TS 890) — suitable for food manufacturing, industrial use, and bulk export.",
    intro:
      "Our refined oils are processed to international quality standards for food and industrial applications. Products are available in bulk packaging for export with full specification documentation.",
    highlights: [
      "Refined, winterized, deodorized, bleached soybean oil",
      "Conforms to Codex Alimentarius and ISO standards",
      "Bulk export packaging for international shipment",
      "Certificate of Analysis available on request",
    ],
  },
  metals: {
    answerCapsule:
      "Global Win Co. Ltd supplies industrial-grade metals including LME-grade copper cathode (99.97%+), copper wire, and aluminum ingots (A7 99.7% / A8 99.8%) for B2B importers and industrial distributors.",
    intro:
      "Our metals division serves industrial buyers requiring certified commodity-grade materials. Products meet international purity standards and are available for bulk export with documentation supporting import compliance.",
    highlights: [
      "Copper cathode 99.97%+ LME grade",
      "Aluminum ingot A7 (99.7%) and A8 (99.8%)",
      "Copper wire for industrial applications",
      "ISO-certified with origin documentation",
    ],
  },
};
