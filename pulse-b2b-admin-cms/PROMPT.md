# Prompt — paste this on every new similar project

**Prerequisites:** Copy the `pulse-b2b-admin-cms` folder into the project root first (and optionally `.cursor/rules/pulse-b2b-admin-cms.mdc` from `cursor-rule.mdc`).

---

## Default prompt (copy everything below)

```
Build the admin dashboard for this project using the Pulse B2B Admin CMS kit.

1. Read and follow:
   - pulse-b2b-admin-cms/SKILL.md
   - pulse-b2b-admin-cms/project-config.md (fill any blanks from docs/pems.md and this repo)
   - pulse-b2b-admin-cms/references/* in the order the skill says
   - docs/pems.md if it exists

2. Structure must match the kit (same as TG Export Trade admin):
   - /admin login + session gate
   - Dashboard
   - Enabled modules only: Quotes, Inquiries, Products, Dealers, Distributors, and optional Certifications / Pages
   - Layers: app/admin pages → components/admin → actions/admin* → services → Prisma
   - Auth.js + lib/adminAuth role gates (SUPER_ADMIN, ADMIN, EDITOR, SALES_MANAGER, READ_ONLY)
   - List + detail patterns, AdminNav, AdminStatusForm, AdminDeleteButton

3. Branding:
   - Use THIS project’s colors, fonts, and CSS/Tailwind tokens from globals.css / PEMS / existing UI
   - Do NOT copy TG navy/gold, tg-* classes, or TG product content
   - Map kit semantics (primary, surface, muted, border, etc.) to this project’s token prefix

4. Execute pulse-b2b-admin-cms/references/build-checklist.md in order.
   Reuse existing auth/Prisma/tokens if already present; extend, don’t duplicate.
   Skip modules marked off in project-config.

5. When done: summarize what was enabled, any project-config you filled, and how to log in (seed admin).
```

---

## Short prompt (if the kit + rule are already in the project)

```
Read pulse-b2b-admin-cms/SKILL.md and build the /admin dashboard per the kit checklist. Same structure as the kit; this project’s brand tokens only. Fill project-config from PEMS/repo, enable only the modules we need, then implement.
```

---

## Optional one-liners to add under the prompt

**Modules (edit as needed):**
```
Modules for this client: Quotes, Inquiries, Products, Dealers, Distributors on. Certifications and Pages later.
```

**If auth/DB already exist:**
```
Auth and Prisma already exist — extend them; do not replace the auth stack.
```

**If starting fresh:**
```
Scaffold auth, Prisma admin models, seed admin user, and full /admin per the kit.
```
