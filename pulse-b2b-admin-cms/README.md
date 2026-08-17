# Pulse B2B Admin CMS Kit

Copy this folder into a similar Next.js B2B / export / catalogue project. The agent builds the **same admin structure** as TG Export Trade, using **that project’s branding tokens** (colors, fonts, radii).

## How to use on a new project

1. Copy this entire folder into the project root:

```text
your-project/
  pulse-b2b-admin-cms/     ← this kit
  docs/pems.md             ← create/update with brand + modules
  app/ …
```

2. Optional but recommended: also copy the skill into Cursor skills so it auto-triggers:

```text
%USERPROFILE%\.cursor\skills\pulse-b2b-admin-cms\
```

Copy `SKILL.md` + `references/` there (same layout).

3. Optional: copy `cursor-rule.mdc` into the project as:

```text
.cursor/rules/pulse-b2b-admin-cms.mdc
```

4. Paste the prompt from [`PROMPT.md`](./PROMPT.md) into the agent chat (Agent mode).

5. Fill `project-config.md` in the copied kit if the agent asks — or let it fill from PEMS / the repo.

## What stays the same vs what changes

| Same on every project | Changes per project |
|---|---|
| Route tree under `/admin` | Brand CSS tokens / fonts |
| Auth.js + role gates | Company name, seed admin email |
| Actions → services → Prisma | Schema field extras |
| List + detail page patterns | Which modules are enabled |
| AdminNav / StatusForm / DeleteButton | Nav labels if modules differ |

## Contents

| Path | Purpose |
|---|---|
| `SKILL.md` | Agent instructions |
| `project-config.md` | Fill once per client |
| `references/architecture.md` | Layered architecture contract |
| `references/file-tree.md` | Exact files to create |
| `references/module-map.md` | Core / sales / CMS modules |
| `references/branding.md` | How to map brand tokens |
| `references/page-patterns.md` | List / detail / dashboard / login |
| `references/prisma-core.md` | Generic Prisma shapes |
| `references/build-checklist.md` | Ordered build steps |
| `cursor-rule.mdc` | Optional project rule |

## Reference implementation

Built from **TG Export Trade** (`tg-exploret-web`). Do **not** copy TG navy/gold or oil/rice content into other clients — only structure and patterns.
