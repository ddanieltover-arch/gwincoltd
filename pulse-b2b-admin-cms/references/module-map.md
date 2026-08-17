# Module map

Turn modules on/off via `project-config.md`. Structure and patterns stay identical.

## Core (always)

| Module | Routes | Nav | Actions | Services |
|---|---|---|---|---|
| Auth / login | `/admin/login` | — | `loginAction`, `signOutAction` | User lookup in auth |
| Gate | proxy/middleware | — | — | — |
| Dashboard | `/admin` | Dashboard | — | counts from enabled queues |
| Roles helpers | — | — | used by all writes | `lib/adminAuth.ts` |

## Sales

| Module | Routes | Nav label | Gate | Notes |
|---|---|---|---|---|
| Quotes | `/admin/quotes`, `/admin/quotes/[id]` | Quotes | `requireSalesWrite` | Status + full edit; optimistic `version` if present |
| Inquiries | `/admin/inquiries`, `/admin/inquiries/[id]` | Inquiries | `requireSalesWrite` | Contact / inquiry queue |
| Dealers | `/admin/dealers`, `/admin/dealers/[id]` | Dealers | `requireSalesWrite` | Partner application |
| Distributors | `/admin/distributors`, `/admin/distributors/[id]` | Distributors | `requireSalesWrite` | Same form pattern as dealers |

**Partners shortcut:** If the client has one partner type, keep one route (`/admin/partners`) but reuse the same list/detail + `AdminPartnerEditForm` pattern.

## CMS

| Module | Routes | Nav | Gate | Notes |
|---|---|---|---|---|
| Products | `/admin/products`, `/admin/products/[id]` | Products | `requireCmsWrite` | Create on list; detail = core + specs + packaging + images |
| Certifications | `/admin/certifications`, `/admin/certifications/[id]` | optional | `requireCmsWrite` | Add to nav if enabled |
| Site pages | `/admin/pages` | optional | `requireCmsWrite` | Fixed-slug editors (no `[id]` required) |

## Dashboard widgets

Only include widgets for **enabled** modules:

- Pending quotations → `/admin/quotes`
- New inquiries → `/admin/inquiries`
- New dealer apps → `/admin/dealers`
- New distributor apps → `/admin/distributors`
- Product count link → `/admin/products`
- Recent quotes / recent inquiries lists

## AdminNav order (default)

```
Dashboard → Quotes → Inquiries → Products → Dealers → Distributors
```

Append Certifications / Pages when enabled. Hide disabled modules entirely.

## Status enums (reuse shapes)

| Domain | Typical statuses |
|---|---|
| Quote | NEW, IN_PROGRESS, AWAITING_INFO, QUOTED, CLOSED, SPAM, ARCHIVED |
| Inquiry | NEW, IN_PROGRESS, CLOSED, SPAM, ARCHIVED |
| Partner app | NEW, UNDER_REVIEW, APPROVED, REJECTED, SPAM |
| CMS publish | DRAFT, PUBLISHED, ARCHIVED |

Rename labels in UI if the client wants friendlier copy; keep enum stability in DB when possible.

## v1 out of scope

Users admin UI, audit log UI, media library grid, blog/news, inventory, analytics, email template editor, freight, global search, MFA.
