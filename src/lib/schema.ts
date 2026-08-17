import { categoryLabels, siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/urls";
import type { ProductCategory } from "@/types";

const LOGO_URL = absoluteUrl(siteConfig.logo);

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 300,
      height: 60,
    },
    description: siteConfig.description,
    foundingDate: String(siteConfig.founded),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      contactType: "sales",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Thai"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "15/1 Weruwan, Sateng",
      addressLocality: "Yala",
      addressRegion: "Yala",
      postalCode: "95000",
      addressCountry: "TH",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${absoluteUrl("/contact-us/")}#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: LOGO_URL,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "15/1 Weruwan, Sateng",
      addressLocality: "Yala",
      addressRegion: "Yala",
      postalCode: "95000",
      addressCountry: "TH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.541,
      longitude: 101.28,
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productSchema(product: {
  name: string;
  description: string;
  slug: string;
  category: ProductCategory;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    category: categoryLabels[product.category],
    brand: { "@type": "Brand", name: siteConfig.name },
    manufacturer: { "@type": "Organization", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      url: absoluteUrl(`/product/${product.slug}`),
      seller: { "@type": "Organization", name: siteConfig.name },
    },
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function definedTermSetSchema(
  terms: { term: string; definition: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: `${siteConfig.name} Commodity Glossary`,
    description: "Definitions of key agricultural commodity and export trading terms.",
    hasDefinedTerm: terms.map((entry) => ({
      "@type": "DefinedTerm",
      name: entry.term,
      description: entry.definition,
    })),
  };
}
