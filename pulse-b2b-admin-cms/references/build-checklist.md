# Build checklist (ordered)

Complete steps in order. Skip a step only if the project already has an equivalent.

## 0. Config

- [ ] Read / fill `project-config.md` and `docs/pems.md`
- [ ] Confirm brand token prefix and utilities exist (see `branding.md`)
- [ ] Confirm enabled modules

## 1. Data + auth foundation

- [ ] Prisma enums + models for enabled modules (`prisma-core.md`)
- [ ] Migrate / push schema
- [ ] Seed admin user (env-based password)
- [ ] Auth.js credentials + JWT session with `role`
- [ ] `app/api/auth/[...nextauth]/route.ts`
- [ ] `lib/adminAuth.ts` role helpers
- [ ] Proxy/middleware gate for `/admin/*`
- [ ] `actions/login.ts` + `features/admin/LoginForm.tsx` + `/admin/login`

## 2. Admin chrome

- [ ] `AdminNav` (enabled modules only) + `AdminSignOutButton` + `actions/adminAuth.ts`
- [ ] `AdminStatusForm` + `AdminDeleteButton` using **project** brand classes
- [ ] Verify login → `/admin` and signed-out redirect to login

## 3. Services for enabled domains

- [ ] quote / inquiry / partner / product / certification / sitePage services as needed
- [ ] Count helpers for dashboard widgets

## 4. Dashboard

- [ ] `/admin` page with widgets + recent lists for enabled queues
- [ ] noindex + force-dynamic

## 5. Sales modules (if on)

For each of Quotes, Inquiries, Dealers, Distributors:

- [ ] List page (table + status form + delete)
- [ ] Detail page + edit form
- [ ] `actions/admin*.ts` with `requireSalesWrite` + revalidatePath

## 6. CMS modules (if on)

- [ ] Products list (create) + rich detail (specs/packaging/images)
- [ ] Certifications list/detail if on
- [ ] Site pages editor if on
- [ ] Actions with `requireCmsWrite`

## 7. Wire public forms (if site already has them)

- [ ] Public RFQ / contact / partner forms call the same services admin lists from
- [ ] Email side effects stay in services, not admin pages

## 8. Hardening pass

- [ ] No `tg-*` (or other foreign prefix) classes unless this is that brand
- [ ] All writes role-gated server-side
- [ ] Admin routes robots noindex
- [ ] Open-redirect safe login callback
- [ ] Empty states for every list
- [ ] Update PEMS: admin modules enabled + auth notes

## Definition of done

An editor/sales user can sign in, see live dashboard counts, process each enabled queue (status + edit + delete), and manage enabled CMS entities — all visually on-brand for **this** client.
