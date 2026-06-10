export interface AboutPillar {
  title: string;
  body: string;
}

export interface AboutPageContent {
  heroLabel: string;
  heroTitle: string;
  intro: string;
  introParagraphs: string[];
  pillars: AboutPillar[];
  closing: {
    title: string;
    body: string;
  };
}

export interface PrivacySection {
  title: string;
  body: string;
}

export interface PrivacyPageContent {
  introParagraphs: string[];
  sections: PrivacySection[];
}
