export interface SeoRobots {
  index: boolean;
  follow: boolean;
}

export interface SeoEntry {
  title: string;
  description: string;
  focusKeyword?: string;
  robots?: SeoRobots;
  canonical?: string;
}

export interface SeoTemplates {
  separator: string;
  homepageTitle: string;
  homepageDescription: string;
  productTitle: string;
  productDescription: string;
  pageTitle: string;
  pageDescription: string;
  categoryTitle: string;
  categoryDescription: string;
}
