# Admin dashboard (sales leads)

Global Win Co. Ltd includes a protected admin area for managing inbound leads:

- **Sign in:** `/sign-in/`
- **Dashboard:** `/admin/dashboard/`
- **Tabs:** Quote requests, contact messages

## Setup

### 1. Supabase Auth

1. In [Supabase](https://supabase.com) → **Authentication** → **Users**, create a user with email `sales@gwincoltd.com` and a secure password.
2. Add that email to `ADMIN_EMAILS` in `.env.local` (comma-separated). `sales@gwincoltd.com` is allowed by default in code.

### 2. Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://...  # Supabase Postgres connection string
ADMIN_EMAILS=sales@gwincoltd.com
```

### 3. Database tables

**Option A — Supabase SQL Editor (recommended if `db:push` cannot connect)**

1. Open [Supabase](https://supabase.com) → your project → **SQL Editor**.
2. Paste the contents of `prisma/supabase-init.sql` and click **Run**.

**Option B — Prisma CLI (from your machine)**

`DATABASE_URL` must be in `.env.local`. Then:

```bash
npm install
npm run db:push
```

Use the **Session pooler** connection string from Supabase → **Project Settings** → **Database**.

This creates `quote_requests` and `contact_submissions`.

### 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000/sign-in/`, sign in, then open `/admin/dashboard/`.

## Behaviour

- Public forms still send email via Resend (unchanged).
- Each successful submission is also saved to Postgres for the admin UI.
- Status workflow: `NEW` → `READ` → `REPLIED` → `ARCHIVED`.

## Production (Vercel)

Set the same env vars on Vercel, run `npm run db:push` once against production Postgres, then deploy.

Optional: restrict `/admin` with Vercel password protection or IP allowlist in addition to Supabase Auth.
