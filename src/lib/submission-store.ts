import "server-only";

import { randomUUID } from "crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { ContactFormData, QuoteFormData } from "@/lib/validations/contact";
import { prisma } from "@/lib/prisma";

export type SubmissionType = "quote" | "contact";
export type SubmissionStatus = "NEW" | "READ" | "REPLIED" | "ARCHIVED";

type RequestMeta = {
  ipAddress?: string;
  userAgent?: string;
};

type ListOptions = {
  type: SubmissionType;
  status?: string | null;
  page: number;
  limit: number;
};

type ListResult = {
  items: Record<string, unknown>[];
  total: number;
  page: number;
  pages: number;
  source: "prisma" | "supabase";
};

export class SubmissionStoreError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message);
    this.name = "SubmissionStoreError";
    this.cause = options?.cause;
  }
}

let supabaseAdmin: SupabaseClient | null = null;

function getSupabaseAdmin() {
  if (supabaseAdmin) {
    return supabaseAdmin;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  supabaseAdmin = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return supabaseAdmin;
}

function toStoreError(cause: unknown) {
  const detail =
    cause instanceof Error && cause.message.trim().length > 0
      ? ` (${cause.message.split("\n")[0]})`
      : "";

  return new SubmissionStoreError(
    "Submission storage is unavailable. Create tables via Supabase SQL Editor (prisma/supabase-init.sql) or run `npm run db:push` with DATABASE_URL in .env.local." +
      detail,
    { cause },
  );
}

function normalizeStatus(status?: string | null): SubmissionStatus | undefined {
  if (status === "NEW" || status === "READ" || status === "REPLIED" || status === "ARCHIVED") {
    return status;
  }
  return undefined;
}

function cleanUpdateData<T extends Record<string, unknown>>(data: T) {
  return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined));
}

function nullableString(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function requiredString(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export async function storeQuoteSubmission(data: QuoteFormData, meta: RequestMeta) {
  const now = new Date().toISOString();

  try {
    const submission = await prisma.quoteRequest.create({
      data: {
        fullName: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        enquiry: data.enquiry,
        product: data.product ?? null,
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      },
    });

    return { id: submission.id, source: "prisma" as const };
  } catch (prismaError) {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      throw toStoreError(prismaError);
    }

    const { data: inserted, error } = await supabase
      .from("quote_requests")
      .insert({
        id: randomUUID(),
        fullName: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        enquiry: data.enquiry,
        product: data.product ?? null,
        ipAddress: meta.ipAddress ?? null,
        userAgent: meta.userAgent ?? null,
        createdAt: now,
        updatedAt: now,
      })
      .select("id")
      .single();

    if (error) {
      throw toStoreError(error);
    }

    return { id: inserted.id as string, source: "supabase" as const };
  }
}

export async function storeContactSubmission(data: ContactFormData, meta: RequestMeta) {
  const now = new Date().toISOString();

  try {
    const submission = await prisma.contactSubmission.create({
      data: {
        fullName: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      },
    });

    return { id: submission.id, source: "prisma" as const };
  } catch (prismaError) {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      throw toStoreError(prismaError);
    }

    const { data: inserted, error } = await supabase
      .from("contact_submissions")
      .insert({
        id: randomUUID(),
        fullName: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        ipAddress: meta.ipAddress ?? null,
        userAgent: meta.userAgent ?? null,
        createdAt: now,
        updatedAt: now,
      })
      .select("id")
      .single();

    if (error) {
      throw toStoreError(error);
    }

    return { id: inserted.id as string, source: "supabase" as const };
  }
}

export async function listSubmissions(options: ListOptions): Promise<ListResult> {
  const status = normalizeStatus(options.status);
  const skip = (options.page - 1) * options.limit;

  try {
    if (options.type === "quote") {
      const where = status ? { status } : {};
      const [items, total] = await Promise.all([
        prisma.quoteRequest.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip,
          take: options.limit,
        }),
        prisma.quoteRequest.count({ where }),
      ]);

      return {
        items: items as unknown as Record<string, unknown>[],
        total,
        page: options.page,
        pages: Math.ceil(total / options.limit) || 1,
        source: "prisma",
      };
    }

    const where = status ? { status } : {};
    const [items, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: options.limit,
      }),
      prisma.contactSubmission.count({ where }),
    ]);

    return {
      items: items as unknown as Record<string, unknown>[],
      total,
      page: options.page,
      pages: Math.ceil(total / options.limit) || 1,
      source: "prisma",
    };
  } catch (prismaError) {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      throw toStoreError(prismaError);
    }

    const table = options.type === "quote" ? "quote_requests" : "contact_submissions";

    let query = supabase
      .from(table)
      .select("*", { count: "exact" })
      .order("createdAt", { ascending: false })
      .range(skip, skip + options.limit - 1);

    if (status) {
      query = query.eq("status", status);
    }

    const { data, count, error } = await query;
    if (error) {
      throw toStoreError(error);
    }

    const total = count ?? data?.length ?? 0;

    return {
      items: (data ?? []) as Record<string, unknown>[],
      total,
      page: options.page,
      pages: Math.ceil(total / options.limit) || 1,
      source: "supabase",
    };
  }
}

export async function updateSubmission({
  id,
  type,
  values,
}: {
  id: string;
  type: SubmissionType;
  values: Record<string, unknown>;
}) {
  const normalizedStatus =
    typeof values.status === "string" ? normalizeStatus(values.status) : undefined;

  if (values.status && !normalizedStatus) {
    throw new SubmissionStoreError("Invalid submission status.");
  }

  const updateData =
    type === "quote"
      ? cleanUpdateData({
          fullName: requiredString(values.fullName),
          email: requiredString(values.email),
          phone: requiredString(values.phone),
          subject: requiredString(values.subject),
          enquiry: requiredString(values.enquiry),
          product: nullableString(values.product),
          status: normalizedStatus,
          notes: nullableString(values.notes),
        })
      : cleanUpdateData({
          fullName: requiredString(values.fullName),
          email: requiredString(values.email),
          phone: requiredString(values.phone),
          subject: requiredString(values.subject),
          message: requiredString(values.message),
          status: normalizedStatus,
          notes: nullableString(values.notes),
        });

  if (Object.keys(updateData).length === 0) {
    throw new SubmissionStoreError("No valid submission fields were provided.");
  }

  try {
    if (type === "quote") {
      await prisma.quoteRequest.update({ where: { id }, data: updateData });
    } else {
      await prisma.contactSubmission.update({ where: { id }, data: updateData });
    }

    return { source: "prisma" as const };
  } catch (prismaError) {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      throw toStoreError(prismaError);
    }

    const table = type === "quote" ? "quote_requests" : "contact_submissions";
    const { error } = await supabase
      .from(table)
      .update({ ...updateData, updatedAt: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      throw toStoreError(error);
    }

    return { source: "supabase" as const };
  }
}

export async function updateSubmissionStatus({
  id,
  type,
  status,
}: {
  id: string;
  type: SubmissionType;
  status: string;
}) {
  return updateSubmission({ id, type, values: { status } });
}

export async function deleteSubmission({ id, type }: { id: string; type: SubmissionType }) {
  try {
    if (type === "quote") {
      await prisma.quoteRequest.delete({ where: { id } });
    } else {
      await prisma.contactSubmission.delete({ where: { id } });
    }

    return { source: "prisma" as const };
  } catch (prismaError) {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      throw toStoreError(prismaError);
    }

    const table = type === "quote" ? "quote_requests" : "contact_submissions";
    const { error } = await supabase.from(table).delete().eq("id", id);

    if (error) {
      throw toStoreError(error);
    }

    return { source: "supabase" as const };
  }
}
