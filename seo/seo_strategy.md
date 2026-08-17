# SEO + GEO Strategy — Global Win Co. Ltd (gwincoltd.com)

**Generated:** August 2026  
**Stack:** Next.js 16 · Vercel · Static B2B catalog  
**Target:** International wholesale buyers (rice, sugar, fertilizer, oils, metals)

---

## Executive Summary

Global Win Co. Ltd is a B2B agricultural commodity exporter based in Yala, Thailand. The site migrated from WordPress/WooCommerce to Next.js with 36 products across 5 categories. This strategy implements full technical SEO, structured data, GEO/AEO optimization, and a content pipeline for AI citation readiness.

## Phase Completion Status

| Phase | Scope | Status |
|-------|-------|--------|
| 0–1 | Pre-flight audit + keyword mapping | Complete |
| 2 | Technical SEO (sitemap, canonicals, robots, llms.txt) | Complete |
| 3 | On-page SEO (answer capsules, breadcrumbs, category intros) | Complete |
| 4 | Structured data (Organization, Product, FAQ, LocalBusiness) | Complete |
| 5 | GEO/AEO (FAQ hub, glossary, llms.txt, question-first headings) | Complete |
| 6 | Local SEO (LocalBusiness schema, NAP, areaServed) | Complete |
| 7 | Analytics (GA4 hooks — requires env var) | Partial |
| 8 | Content calendar + briefs | Complete |
| 9 | Link building pipeline | Seeded |
| 10 | CI/CD SEO validation | Complete |

## Primary Keyword Targets

1. **ICUMSA 45 white sugar wholesale** → `/product/icumsa-45-white-refined-sugar/`
2. **Thai jasmine rice exporter** → `/our-products/rice/`
3. **NPK fertilizer wholesale** → `/our-products/fertilizer/`
4. **Commodity export Thailand** → `/about-us/` + `/faq/`

## Technical Implementation

- Trailing-slash canonical URLs via `src/lib/urls.ts`
- Auto-generated OG/Twitter metadata via enhanced `seoToMetadata()`
- AI crawler access in `robots.ts` (GPTBot, ClaudeBot, PerplexityBot)
- Global JSON-LD: Organization + WebSite on every page
- Page-specific: Product, BreadcrumbList, FAQPage, LocalBusiness, DefinedTermSet
- `public/llms.txt` for LLM crawler discovery

## Remaining Manual Actions

1. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel environment
2. Verify domain in Google Search Console (DNS TXT)
3. Submit `https://gwincoltd.com/sitemap.xml` to GSC and Bing
4. Claim/optimize Google Business Profile (Yala HQ)
5. Optimize LCP (baseline: 4.7s local — target ≤2.5s production)
6. Execute link building outreach from `link_building_crm.csv`

## KPI Targets (90 days)

| KPI | Target |
|-----|--------|
| Organic sessions | +30% |
| Indexed pages | 48/48 |
| Average position (top 20 keywords) | <15 |
| CTR (GSC) | >3% |
| LCP (production) | ≤2.5s |
| AI citation rate (manual spot-check) | Track monthly |
