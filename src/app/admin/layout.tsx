import type { Metadata } from "next";
import { requireAdminPageAccess } from "@/lib/admin-auth";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdminPageAccess();
  return children;
}
