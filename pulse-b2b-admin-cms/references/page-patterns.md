# Page patterns

Use project brand classes (`{prefix}` from project-config). Examples below use `brand` as placeholder.

## Shell header (every page)

```tsx
<div className="mx-auto max-w-[var(--brand-container)] px-4 py-10 md:px-6">
  <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
        Admin
      </p>
      <h1 className="font-display text-3xl text-brand-primary">{title}</h1>
    </div>
    <AdminNav current={currentPath} />
  </div>
  {/* content */}
</div>
```

## Login

- Centered surface panel, brand title, `LoginForm`
- No `AdminNav`
- On success: redirect to safe callback under `/admin` only (prevent open redirects)

## Dashboard

1. Shell header (`current="/admin"`)
2. Widget grid (`sm:grid-cols-2 lg:grid-cols-4`): each widget = Link to queue, muted label + display number
3. Optional catalogue count link
4. Two-column recent lists (quotes / inquiries) with links to detail

## List page (quotes, inquiries, dealers, distributors)

1. Shell header
2. Empty state: dashed border + muted message
3. Else: bordered table
   - Columns: identity, key fields, status, dates, actions
   - Row actions: detail Link + `AdminStatusForm` (status `<select>` + hidden id) + `AdminDeleteButton`
4. Products / certifications lists: add **create** form section above the table (bordered surface)

## Detail page (queue entities)

1. Shell header; title = reference code / company / name
2. Back link to list
3. Optional delete with `hrefAfter` → list
4. One surface section with domain edit form (`Admin*EditForm` wrapping `AdminStatusForm`)
5. `notFound()` if missing

## Product detail (CMS-rich)

Sections stacked:

1. Core fields form (name, slug, category, status, descriptions, origin…)
2. Specifications: list + add/remove
3. Packaging: list + add/remove
4. Images: list + URL attach (+ optional storage upload)

Each subsection uses its own server action; keep auth as `requireCmsWrite`.

## Site pages (CMS)

Single page with one editor block per fixed slug (e.g. about, export-markets). Upsert via `updateSitePageAction`.

## Client primitives behavior

### AdminStatusForm

- `"use client"`
- `onSubmit` preventDefault → `FormData` → `startTransition` → `action(formData)`
- Success toast + `router.refresh()`
- Error toast on throw

### AdminDeleteButton

- Confirm dialog text
- Call delete action
- Navigate to `hrefAfter` or refresh

### AdminNav

- Links only for enabled modules
- `aria-current="page"` on active
- Active: primary fill + white text
- Inactive: muted → hover surface
- Include `AdminSignOutButton`
