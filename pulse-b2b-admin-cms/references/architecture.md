# Architecture contract

## Stack

Next.js App Router · TypeScript · Tailwind + CSS variables · Prisma · Auth.js (Credentials) · Server Actions

## Request flow

```
Browser
  → proxy/middleware matcher `/admin/:path*`
       /admin/login + session → redirect /admin
       other /admin/* without session → /admin/login?callbackUrl=…
  → RSC page (force-dynamic, robots noindex)
       → services/* for reads
  → Client components for mutations UX
       → actions/admin*.ts
            → requireAdmin / requireCmsWrite / requireSalesWrite
            → parse FormData (+ Zod if project uses it)
            → services or Prisma
            → revalidatePath(list) + revalidatePath(detail) + revalidatePath("/admin")
```

## Layer rules

| Layer | May import | Must not |
|---|---|---|
| `app/admin/**` | services, components, prisma for simple reads | `"use client"` on page files |
| `components/admin/**` | actions (as props/imports), next/navigation | Prisma, secrets |
| `actions/admin*.ts` | adminAuth, services, prisma, revalidatePath | UI components |
| `services/*.ts` | prisma, email/storage helpers | auth() / require* |
| `lib/adminAuth.ts` | auth() | Prisma writes |

## Auth

- Auth.js JWT session; custom pages.signIn = `/admin/login`
- Session user: `id`, `email`, `name`, `role: AdminRole`
- Password: bcrypt hash on `User.passwordHash`
- API route: `app/api/auth/[...nextauth]/route.ts`

## Role matrix (writes)

| Capability | Roles |
|---|---|
| Any admin session | all roles including READ_ONLY |
| Full write (users/settings later) | SUPER_ADMIN, ADMIN |
| CMS write (products, certs, pages) | + EDITOR |
| Sales write (quotes, inquiries, partners) | + SALES_MANAGER |

UI may hide controls; **actions always re-check**.

## Naming

- Actions: `actions/admin{Domain}.ts` → `updateXAction`, `deleteXAction`
- Services: `services/{domain}Service.ts` — public create + admin list/get often colocated; heavy admin domains may use `admin{Domain}Service.ts`
- Components: `components/admin/Admin*.tsx`
- Login form: `features/admin/LoginForm.tsx`

## Revalidation

After every successful write touching a queue or CMS entity:

- List path: `/admin/{module}`
- Detail path if applicable: `/admin/{module}/{id}`
- Dashboard: `/admin`
