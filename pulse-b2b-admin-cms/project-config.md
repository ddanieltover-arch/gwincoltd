# Project config — fill once per client

Agents: if this file is empty or still contains placeholders, ask the user or read `docs/pems.md` before scaffolding.

## Identity

| Field | Value |
|---|---|
| Client / project name | `<!-- e.g. Acme Export Co. -->` |
| Legal / display name | |
| Primary domain | |
| Admin seed email | |
| Product domain (1 line) | `<!-- e.g. edible oils & rice -->` |

## Brand tokens

| Semantic role | CSS variable in this project | Tailwind / utility class |
|---|---|---|
| Token prefix | `<!-- e.g. brand, acme, tg -->` | |
| Primary | `--{prefix}-color-primary` | `bg-{prefix}-primary` / `text-{prefix}-primary` |
| Primary hover | | `bg-{prefix}-primary-hover` |
| Secondary / accent | | `border-{prefix}-secondary` |
| Background | | `bg-{prefix}-bg` |
| Surface | | `bg-{prefix}-surface` |
| Text | | `text-{prefix}-text` (or body default) |
| Muted | | `text-{prefix}-muted` |
| Border | | `border-{prefix}-border` |
| Error | | `text-{prefix}-error` |
| Success | | |
| Radius md | `--{prefix}-radius-md` | |
| Container width | `--{prefix}-container` | |
| Display font | | `font-display` |

**Rule:** Admin classes must use **this table**, not another client’s prefix.

## Modules

Mark each: `on` | `off` | `later`

### Core (required)

| Module | Status |
|---|---|
| Login + session gate | on |
| Dashboard | on |
| Users / roles (seed admin at minimum) | on |

### Sales

| Module | Status | Notes |
|---|---|---|
| Quotes / RFQ | `<!-- on/off/later -->` | |
| Inquiries / contact | | |
| Dealers | | |
| Distributors | | merge into Partners if preferred |

### CMS

| Module | Status | Notes |
|---|---|---|
| Products (+ specs / packaging / images) | | |
| Categories | | often implicit via products |
| Certifications | | |
| Site pages (fixed slugs) | | |
| Media library (dedicated) | later | URL attach is enough for v1 |

## Stack assumptions

| Layer | Expected default | This project |
|---|---|---|
| Framework | Next.js App Router | |
| DB | Prisma (SQLite local / Postgres prod) | |
| Auth | Auth.js credentials → `/admin/login` | |
| Styling | Tailwind + CSS variables | |
| Mutations | Server Actions | |
| Email (optional) | Resend or existing mailer | |
| Media (optional) | Supabase Storage or URL-only | |

## Out of scope for v1 (unless user insists)

Inventory, freight, analytics, newsletter, global search, MFA/SSO, custom RBAC UI, rich blog CMS.
