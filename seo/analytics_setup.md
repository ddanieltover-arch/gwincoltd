# Analytics Setup — Global Win Co. Ltd

## Google Analytics 4

### Environment Variable
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Add to Vercel → Project Settings → Environment Variables (Production + Preview).

### Implementation
- `src/components/analytics/GoogleAnalytics.tsx` — loads gtag.js via `next/script`
- Integrated in root `layout.tsx`
- No tracking when env var is unset (safe for local dev)

### Conversion Events Configured

| Event | Trigger | GA4 Event Name |
|-------|---------|----------------|
| Quote form submit | `QuoteForm` success | `generate_lead` |
| Contact form submit | `ContactForm` success | `contact` |
| WhatsApp click | `WhatsAppButton` click | `whatsapp_click` |

### GA4 Admin Setup (manual)
1. Create GA4 property for `gwincoltd.com`
2. Add web data stream
3. Copy Measurement ID to env var
4. Mark `generate_lead` and `contact` as conversions in GA4 Admin → Events
5. Link GA4 to Google Search Console

## Google Search Console

1. Add property: `https://gwincoltd.com`
2. Verify via DNS TXT record (recommended) or HTML tag
3. Submit sitemap: `https://gwincoltd.com/sitemap.xml`
4. Set preferred domain (non-www vs www — site uses `gwincoltd.com`)
5. Enable email alerts for coverage and CWV issues

## Google Tag Manager (optional upgrade)

If GTM is preferred over direct GA4:
1. Replace `GoogleAnalytics` component with GTM container snippet
2. Configure GA4 tag inside GTM
3. Use GTM triggers for form events instead of direct gtag calls

## Enhanced Measurement (enable in GA4)

- Scroll depth (90%)
- Outbound clicks
- File downloads
- Site search (if added later)

## BigQuery Export (optional)

GA4 free tier supports BigQuery export for raw event retention beyond 14 months.
