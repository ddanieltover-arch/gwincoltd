export interface FaqEntry {
  question: string;
  answer: string;
  category: "general" | "rice" | "sugar" | "fertilizer" | "shipping" | "certifications";
}

export const faqEntries: FaqEntry[] = [
  {
    category: "general",
    question: "What does Global Win Co. Ltd export?",
    answer:
      "Global Win Co. Ltd exports rice, sugar, fertilizer, refined oils, and metals from Thailand to international wholesale buyers. We serve importers, distributors, and traders worldwide with quote-based B2B export sales.",
  },
  {
    category: "general",
    question: "How do I request a wholesale quote?",
    answer:
      "Browse our product catalog, open any product page, and submit the quote form with your quantity, destination port, and packaging requirements. You can also contact us via email, phone, or WhatsApp. We typically respond within 24 business hours.",
  },
  {
    category: "sugar",
    question: "What is ICUMSA 45 white refined sugar?",
    answer:
      "ICUMSA 45 is a high-purity white refined cane sugar graded by the International Commission for Uniform Methods of Sugar Analysis (ICUMSA). Lower ICUMSA numbers indicate higher purity — ICUMSA 45 is among the whitest, finest grades used in food, beverage, and confectionery applications worldwide.",
  },
  {
    category: "sugar",
    question: "What is the difference between ICUMSA 45 and ICUMSA 150?",
    answer:
      "ICUMSA 45 is a premium white refined sugar with higher polarization and lower color than ICUMSA 150. ICUMSA 150 is still refined white sugar but allows slightly higher color and ash content. ICUMSA 45 suits premium food applications; ICUMSA 150 is common for general industrial and food use at competitive pricing.",
  },
  {
    category: "rice",
    question: "What types of Thai rice does Global Win export?",
    answer:
      "We export Thai Hom Mali (Jasmine) rice, 1121 Sella Basmati, parboiled rice, long-grain rice, glutinous rice, Japonica rice, brown rice, broken rice, and specialty cargo rice varieties. All products meet export-grade specifications with flexible bulk and retail packaging.",
  },
  {
    category: "rice",
    question: "How do I import rice from Thailand?",
    answer:
      "Importing Thai rice requires selecting a certified exporter, agreeing on grade and packaging, arranging shipping (FOB or CIF terms), and complying with your country's import regulations and phytosanitary requirements. Contact us with your destination country and volume for a tailored export quote and documentation support.",
  },
  {
    category: "fertilizer",
    question: "What NPK fertilizer grades are available?",
    answer:
      "We supply NPK compound fertilizers, urea, DAP (diammonium phosphate), MAP (monoammonium phosphate), ammonium sulfate, superphosphate, and specialty micronutrient blends. Grades and formulations can be matched to agricultural or industrial requirements — request a quote for specific N-P-K ratios.",
  },
  {
    category: "shipping",
    question: "What shipping terms do you offer?",
    answer:
      "We work with international buyers on FOB, CIF, and other Incoterms depending on destination and volume. Minimum order quantities vary by product. Share your target port, container volume, and timeline when requesting a quote for accurate freight and pricing.",
  },
  {
    category: "shipping",
    question: "Which countries do you export to?",
    answer:
      "Global Win Co. Ltd serves international markets worldwide from our base in Thailand. We have experience shipping agricultural commodities to importers across Asia, Africa, the Middle East, and other regions. Contact us with your destination for availability and logistics options.",
  },
  {
    category: "certifications",
    question: "What quality certifications does Global Win hold?",
    answer:
      "Our operations align with GMP, HACCP, and Global GAP standards. Product-specific certifications and laboratory specifications are provided with export documentation. We maintain rigorous quality control from sourcing through packaging to meet international buyer requirements.",
  },
  {
    category: "certifications",
    question: "Do you provide product specifications and COA?",
    answer:
      "Yes. Each product listing includes technical specifications. Certificate of Analysis (COA), phytosanitary certificates, and other export documentation are provided according to destination country requirements. Include your documentation needs when submitting a quote request.",
  },
  {
    category: "general",
    question: "What is the minimum order quantity (MOQ)?",
    answer:
      "MOQ varies by product and packaging format — bulk container loads for commodities like rice and sugar, and flexible quantities for specialty products. Submit a quote request with your target volume and we will confirm MOQ, pricing, and lead time for your order.",
  },
  {
    category: "fertilizer",
    question: "What is urea fertilizer used for?",
    answer:
      "Urea is a nitrogen fertilizer with up to 46% nitrogen content, widely used in agriculture as a base or top-dress fertilizer. It is highly soluble and efficient for crop nutrition. We supply agricultural-grade and automotive-grade (AdBlue/DEF) urea for export.",
  },
  {
    category: "sugar",
    question: "Do you supply brown cane sugar?",
    answer:
      "Yes. We export ICUMSA 600–1200 brown cane sugar with rich color and natural molasses content, suitable for baking, beverages, and food manufacturing. Brown sugar specifications including polarity, moisture, and granulation are available on individual product pages.",
  },
  {
    category: "general",
    question: "Where is Global Win Co. Ltd located?",
    answer:
      "Our headquarters is at 15/1 Weruwan, Sateng, Yala 95000, Thailand. We have been operating as a multi-commodity trading company since 2016, sourcing and exporting agricultural products to international wholesale markets.",
  },
];

export const faqCategories: { id: FaqEntry["category"]; label: string }[] = [
  { id: "general", label: "General" },
  { id: "rice", label: "Rice" },
  { id: "sugar", label: "Sugar" },
  { id: "fertilizer", label: "Fertilizer" },
  { id: "shipping", label: "Shipping & Export" },
  { id: "certifications", label: "Quality & Certifications" },
];
