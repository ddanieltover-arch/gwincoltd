# SEO Redirect Map — gwincoltd.com

All redirects configured in `next.config.ts`. WordPress used trailing slashes; Next.js `trailingSlash: true` matches.

## Product URLs (preserved — no redirect)

| Old URL | New URL | Type |
|---------|---------|------|
| `/product/{slug}/` | `/product/{slug}/` | **Same** (36 products) |

## Core pages (preserved)

| Old URL | New URL |
|---------|---------|
| `/` | `/` |
| `/about-us/` | `/about-us/` |
| `/contact-us/` | `/contact-us/` |
| `/our-products/` | `/our-products/` |
| `/privacy-policy/` | `/privacy-policy/` |

## Category redirects (301)

| Old WordPress URL | New URL |
|-------------------|---------|
| `/product-category/rice/` | `/our-products/rice/` |
| `/product-category/sugar/` | `/our-products/sugar/` |
| `/product-category/fertilizer/` | `/our-products/fertilizer/` |
| `/product-category/refined-oils/` | `/our-products/oils/` |
| `/product-category/oils/` | `/our-products/oils/` |
| `/product-category/metals/` | `/our-products/metals/` |
| `/product-category/{other}/` | `/our-products/` |

## Legacy / cleanup redirects (301)

| Old URL | New URL |
|---------|---------|
| `/shop/` | `/our-products/` |
| `/shop/{path}/` | `/our-products/` |
| `/blocks/{path}/` | `/` |
| `/featured_item/` | `/our-products/` |
| `/featured_item/{path}/` | `/our-products/` |
| `/wp-content/uploads/{path}` | `/uploads/{path}` |

## Removed (410 or redirect to home)

| Old URL | Action |
|---------|--------|
| `/wp-admin/` | Redirect `/` (temporary) |
| `/wp-login.php` | Not implemented — add at edge if needed |
