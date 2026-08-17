# Target file tree

Create only files for **enabled** modules. Paths assume Next.js App Router at repo root (adjust if app lives in a subfolder).

```
auth.ts
proxy.ts                          # or middleware.ts — gate /admin/*
lib/adminAuth.ts

app/
  api/auth/[...nextauth]/route.ts
  admin/
    page.tsx                      # dashboard
    login/page.tsx
    quotes/page.tsx
    quotes/[id]/page.tsx
    inquiries/page.tsx
    inquiries/[id]/page.tsx
    dealers/page.tsx
    dealers/[id]/page.tsx
    distributors/page.tsx
    distributors/[id]/page.tsx
    products/page.tsx
    products/[id]/page.tsx
    certifications/page.tsx       # optional
    certifications/[id]/page.tsx
    pages/page.tsx                # optional CMS pages

components/admin/
  AdminNav.tsx
  AdminSignOutButton.tsx
  AdminStatusForm.tsx
  AdminDeleteButton.tsx
  AdminQuoteEditForm.tsx          # if Quotes on
  AdminInquiryEditForm.tsx        # if Inquiries on
  AdminPartnerEditForm.tsx        # if Dealers and/or Distributors on

features/admin/
  LoginForm.tsx

actions/
  login.ts
  adminAuth.ts
  adminQuotes.ts
  adminInquiries.ts
  adminPartners.ts
  adminProducts.ts
  adminCertifications.ts          # optional
  adminPages.ts                   # optional

services/
  quoteService.ts
  inquiryService.ts
  partnerService.ts
  adminProductService.ts          # or productService with admin exports
  certificationService.ts
  sitePageService.ts
  emailService.ts                 # if public forms email

prisma/
  schema.prisma                   # enums + models from prisma-core.md
  seed.ts                         # at least one admin User
```

## Page file boilerplate (every admin page)

```ts
export const metadata = {
  title: "…",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
```

## Proxy / middleware matcher

Match `/admin/:path*`. Allow login without session; protect everything else.

## Seed minimum

One `User` with role `ADMIN` or `SUPER_ADMIN`, bcrypt password from env (`ADMIN_EMAIL` / `ADMIN_PASSWORD` or project convention).
