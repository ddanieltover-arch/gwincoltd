-- Global Win Co. Ltd — admin lead tables (run once in Supabase → SQL Editor → Run)
-- Matches prisma/schema.prisma. Safe to re-run: uses IF NOT EXISTS where possible.

DO $$ BEGIN
  CREATE TYPE "SubmissionStatus" AS ENUM ('NEW', 'READ', 'REPLIED', 'ARCHIVED');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "quote_requests" (
  "id" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "enquiry" TEXT NOT NULL,
  "product" TEXT,
  "status" "SubmissionStatus" NOT NULL DEFAULT 'NEW',
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "quote_requests_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "contact_submissions" (
  "id" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "status" "SubmissionStatus" NOT NULL DEFAULT 'NEW',
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "contact_submissions_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "quote_requests_status_idx" ON "quote_requests"("status");
CREATE INDEX IF NOT EXISTS "quote_requests_email_idx" ON "quote_requests"("email");
CREATE INDEX IF NOT EXISTS "quote_requests_createdAt_idx" ON "quote_requests"("createdAt");

CREATE INDEX IF NOT EXISTS "contact_submissions_status_idx" ON "contact_submissions"("status");
CREATE INDEX IF NOT EXISTS "contact_submissions_email_idx" ON "contact_submissions"("email");
CREATE INDEX IF NOT EXISTS "contact_submissions_createdAt_idx" ON "contact_submissions"("createdAt");
