---
name: pulse-b2b-admin-cms
description: Build a Pulse B2B admin CMS dashboard (Next.js App Router + Auth.js + Prisma + server actions) with a fixed structure and project-specific branding. Use when scaffolding or implementing /admin for a B2B export, catalogue, RFQ, partner-application, or similar site; when the user mentions admin dashboard kit, pulse-b2b-admin-cms, or wants the same admin structure as TG Export Trade with different brand colors.
---

# Pulse B2B Admin CMS

*Version 1.0 · Codename: Ledger*

Reusable admin dashboard **structure** for Pulse B2B / export / catalogue sites. Branding, copy, and domain fields change per project; architecture does not.

## Required inheritance

1. `pulse-engineering-playbook`
2. `pulse-engineering-framework`
3. `pulse-engineering-memory-system` — read `docs/pems.md` if present
4. `pulse-master-technical-director` for architecture conflicts
5. Implement with `pulse-senior-full-stack-engineer`

## Skill metadata

- **Skill ID:** PSS-ENG-ADM-01
- **Department:** Engineering
- **Reports To:** Master Technical Director
- **Collaborating Skills:** Senior Full Stack Engineer, Design System Architect, Enterprise Cybersecurity Architect, Experience Architect
- **Operating Modes:** Build (default), Review, Refactor, Mentor

## Mission

When asked to build or extend an admin dashboard for a similar B2B project:

1. Use this kit’s **fixed structure** (routes, layers, roles, page patterns).
2. Apply the **current project’s brand tokens** (never hardcode TG navy/gold).
3. Enable only the **modules** the project needs (see `references/module-map.md`).

## Before writing code

1. Read `docs/pems.md` if it exists.
2. Read `pulse-b2b-admin-cms/project-config.md` if present in the project; if empty, ask or infer from PEMS:
   - Brand token prefix and CSS variable names
   - Enabled modules (core / sales / cms)
   - Product domain (e.g. oils, textiles, machinery)
   - Auth/DB already present?
3. Read these references in order:
   - `references/architecture.md`
   - `references/branding.md`
   - `references/module-map.md`
   - `references/file-tree.md`
   - `references/page-patterns.md`
   - `references/prisma-core.md`
   - `references/build-checklist.md`
4. Scan the repo for existing `auth`, Prisma schema, and design tokens — extend, don’t duplicate.

## Non-negotiable structure

```
proxy / middleware gate → /admin/*
  RSC pages (read via services)
  components/admin/* (client UX)
  actions/admin*.ts (role gate + FormData + revalidate)
  services/* (Prisma)
  auth.ts + lib/adminAuth.ts (session + RBAC)
```

| Layer | Owns |
|---|---|
| Pages | Layout chrome, data fetch, compose forms |
| Components | Client interactivity (status save, delete confirm, login) |
| Actions | `"use server"`, `require*Write`, validate, revalidatePath |
| Services | Prisma queries/mutations (no auth) |
| Auth helpers | Session + role assertions |

## Routes (always)

| Path | Purpose |
|---|---|
| `/admin/login` | Credentials login |
| `/admin` | Dashboard widgets + recent queues |
| `/admin/{module}` | List (+ optional create) |
| `/admin/{module}/[id]` | Detail edit |

Enable modules from `references/module-map.md`. Do not invent a different IA (no sidebar redesign unless the user asks).

## Roles (always)

```
SUPER_ADMIN | ADMIN | EDITOR | SALES_MANAGER | READ_ONLY
```

- `requireAdmin` — any authenticated admin
- `requireAdminWrite` — SUPER_ADMIN, ADMIN
- `requireCmsWrite` — + EDITOR
- `requireSalesWrite` — + SALES_MANAGER
- READ_ONLY: can view (proxy allows session); writes fail in actions

## Branding rules

1. Discover tokens from the project (`globals.css`, design tokens, PEMS).
2. Map semantic roles: primary, primary-hover, secondary, bg, surface, text, muted, border, error, success, radius-md, container, font-display.
3. Use **project classes** (`bg-{prefix}-primary`, etc.). Never leave `tg-*` classes in a non-TG project.
4. Admin is dense/calm (Linear/Notion clarity). No marketing hero chrome inside `/admin`.
5. See `references/branding.md`.

## Page chrome (every admin page)

1. Container: `mx-auto max-w-[var(--{prefix}-container)] px-4 py-10 md:px-6`
2. Header: eyebrow “Admin” + `h1` (font-display, primary) + `<AdminNav current="…" />`
3. Content: bordered surface panels / tables
4. Metadata: `robots: { index: false, follow: false }`
5. `export const dynamic = "force-dynamic"`

## Shared components (always build)

- `AdminNav` — pill/section nav for enabled modules + sign out
- `AdminSignOutButton`
- `AdminStatusForm` — client form + transition + toast + `router.refresh()`
- `AdminDeleteButton` — confirm → delete action → redirect/refresh
- Domain edit forms that wrap `AdminStatusForm` where useful
- `features/admin/LoginForm` — `useActionState` + login action

## Build order

Follow `references/build-checklist.md` exactly unless the project already has some pieces.

## Decision matrix

| Situation | Action |
|---|---|
| Same stack (Next App Router + Prisma + Auth.js) | Complete with this skill |
| Different stack | Adapt patterns; escalate stack change to MTD |
| User wants full ERP (inventory, freight, analytics) | Build core kit first; park extras |
| Brand tokens missing | Define minimal token set with Design System patterns, then build admin |
| Security / MFA / SSO requested | Collaborate with Cybersecurity skill; don’t invent SSO alone |

## Refuse / avoid

- Copying TG product content, oil/rice SKUs, or TG brand colors into other clients
- Public-indexing admin routes
- Skipping server-side role checks (UI hide is not enough)
- Putting Prisma calls directly in client components
- Redesigning admin into a card-heavy marketing layout

## Done when

- [ ] Login + proxy gate work
- [ ] Dashboard shows live counts for enabled queues
- [ ] Each enabled module has list + detail (or list-only for Pages)
- [ ] Writes are role-gated; revalidation updates lists
- [ ] Admin UI uses **this project’s** brand tokens only
- [ ] PEMS / project-config notes what was enabled

## Operating modes

- **Build** — scaffold per checklist
- **Review** — audit structure vs this kit; flag brand leaks (`tg-*` in wrong repo)
- **Refactor** — align an existing admin to this structure without changing business rules
- **Mentor** — explain why layers split this way
