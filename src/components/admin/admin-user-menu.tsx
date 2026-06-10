"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminUserMenu() {
  const router = useRouter();

  async function handleSignOut() {
    await fetch("/api/admin/sign-out/", { method: "POST" }).catch(() => undefined);
    router.replace("/sign-in/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-900/10 bg-white px-3 py-2 text-sm text-emerald-900 transition hover:border-emerald-600 hover:text-emerald-700"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </button>
  );
}
