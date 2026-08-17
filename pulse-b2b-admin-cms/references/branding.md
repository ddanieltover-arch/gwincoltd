# Branding adaptation

Admin structure is fixed. **Visual tokens come from the host project.**

## Discover tokens

1. `app/globals.css` / `styles/globals.css` — `:root` and `@theme`
2. `docs/pems.md` Design Profile
3. `pulse-b2b-admin-cms/project-config.md`
4. Existing marketing components (button primary class)

## Semantic map (required)

Every admin UI must resolve these semantics — names differ per project:

| Semantic | Purpose in admin |
|---|---|
| primary | Titles, active nav, primary buttons, links |
| primary-hover | Button hover |
| secondary | Hover borders on widgets, accent borders |
| bg | Page / table head background |
| surface | Panels, table rows, forms |
| muted | Eyebrows, empty states, helper text |
| border | Panel and table borders |
| error | Delete/error toasts and validation |
| radius-md | Buttons, nav pills, inputs |
| container | Max width of admin shell |
| font-display | `h1` / widget numbers / section titles |

## Class substitution

Reference implementation (TG) uses prefix `tg`:

| TG class | Your project |
|---|---|
| `bg-tg-primary` | `bg-{prefix}-primary` |
| `hover:bg-tg-primary-hover` | `hover:bg-{prefix}-primary-hover` |
| `text-tg-primary` | `text-{prefix}-primary` |
| `text-tg-muted` | `text-{prefix}-muted` |
| `text-tg-error` | `text-{prefix}-error` |
| `border-tg-border` | `border-{prefix}-border` |
| `bg-tg-surface` | `bg-{prefix}-surface` |
| `bg-tg-bg` | `bg-{prefix}-bg` |
| `border-tg-secondary` | `border-{prefix}-secondary` |
| `font-display` | keep if project defines it |
| `max-w-[var(--tg-container)]` | `max-w-[var(--{prefix}-container)]` |
| `rounded-[var(--tg-radius-md)]` | `rounded-[var(--{prefix}-radius-md)]` |

## If tokens are missing

Create a minimal set in `globals.css` before building admin (Design System–aligned):

```css
:root {
  --brand-color-primary: /* from logo / brand guide */;
  --brand-color-primary-hover: /* slightly lighter/darker */;
  --brand-color-secondary: /* accent */;
  --brand-color-bg: /* page bg */;
  --brand-color-surface: /* panel */;
  --brand-color-text: /* body */;
  --brand-color-text-muted: /* secondary text */;
  --brand-color-border: /* borders */;
  --brand-color-error: #b42318;
  --brand-color-success: #1f7a4c;
  --brand-radius-md: 0.5rem;
  --brand-container: 75rem;
}
```

Wire the same names into Tailwind `@theme` so `bg-brand-primary` etc. work. Use the project’s real prefix, not necessarily `brand`.

## Layout / tone (same every project)

- Dense, calm ops UI — not a marketing landing page
- No hero images, no card grids of promos inside admin
- Panels: `border … bg-{prefix}-surface p-5|p-6`
- Tables: bordered, `thead` on `bg-{prefix}-bg`
- Empty states: dashed border + muted text
- Primary CTAs: min height ~44px, primary fill, white text
- Toast: prefer CSS variables for colors; avoid hardcoded hex from another client

## Hard ban

- Shipping another client’s palette into this repo
- Leaving `tg-*` utilities in a non-TG project
- Introducing purple-gradient / generic AI dashboard skins that ignore brand tokens
