"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  FileText,
  LayoutDashboard,
  Mail,
  Pencil,
  RefreshCw,
  Save,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";
import { AdminUserMenu } from "@/components/admin/admin-user-menu";
import { siteConfig } from "@/config/site";
import { cn, formatDate } from "@/lib/utils";

type Tab = "quotes" | "contacts";
type ItemType = "quote" | "contact";

function tabToType(tab: Tab): ItemType {
  return tab === "quotes" ? "quote" : "contact";
}

const STATUS_OPTIONS = ["NEW", "READ", "REPLIED", "ARCHIVED"];

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  tone = "emerald",
}: {
  icon: typeof FileText;
  label: string;
  value: string | number;
  sub?: string;
  tone?: "emerald" | "blue" | "amber" | "stone";
}) {
  const tones = {
    emerald: "bg-emerald-100 text-emerald-700",
    blue: "bg-blue-100 text-blue-700",
    amber: "bg-amber-100 text-amber-800",
    stone: "bg-stone-200 text-stone-700",
  };

  return (
    <div className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm">
      <div className={cn("mb-3 flex h-10 w-10 items-center justify-center rounded-xl", tones[tone])}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-2xl font-bold text-emerald-950">{value}</p>
      <p className="mt-0.5 text-sm font-medium text-emerald-900">{label}</p>
      {sub && <p className="mt-0.5 text-xs text-emerald-900/50">{sub}</p>}
    </div>
  );
}

function StatusBadge({ status }: { status?: string }) {
  const map: Record<string, string> = {
    NEW: "bg-emerald-100 text-emerald-800",
    READ: "bg-blue-100 text-blue-700",
    REPLIED: "bg-stone-200 text-stone-700",
    ARCHIVED: "bg-amber-100 text-amber-800",
  };

  return (
    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", map[status ?? ""] ?? map.NEW)}>
      {status ?? "NEW"}
    </span>
  );
}

async function fetchSubmissions(tab: Tab) {
  const type = tabToType(tab);
  const res = await fetch(`/api/admin/submissions/?type=${type}&limit=50`, { cache: "no-store" });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error ?? `Unable to load ${type}.`);
  }
  return (data.items ?? []) as Record<string, unknown>[];
}

function DetailField({ label, value, full }: { label: string; value: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-900/50">{label}</p>
      <div className="mt-1 whitespace-pre-wrap rounded-xl border border-emerald-900/10 bg-stone-50 p-3 text-sm text-emerald-950">
        {value || "-"}
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [quotes, setQuotes] = useState<Record<string, unknown>[]>([]);
  const [contacts, setContacts] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("quotes");
  const [selected, setSelected] = useState<Record<string, unknown> | null>(null);
  const [selectedType, setSelectedType] = useState<ItemType>("quote");
  const [selectedTab, setSelectedTab] = useState<Tab>("quotes");
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<Record<string, unknown>>({});

  const fetchData = async () => {
    setLoading(true);
    setLoadError(null);
    setActionError(null);
    try {
      const [q, c] = await Promise.all([fetchSubmissions("quotes"), fetchSubmissions("contacts")]);
      setQuotes(q);
      setContacts(c);
    } catch (err) {
      setQuotes([]);
      setContacts([]);
      setLoadError(err instanceof Error ? err.message : "Unable to load submissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const currentItems = tab === "quotes" ? quotes : contacts;
  const newQuotes = quotes.filter((q) => q.status === "NEW").length;
  const newContacts = contacts.filter((c) => c.status === "NEW").length;

  const openItem = (item: Record<string, unknown>, tabKey: Tab, editing = false) => {
    setSelected(item);
    setSelectedType(tabToType(tabKey));
    setSelectedTab(tabKey);
    setIsEditing(editing);
    setActionError(null);
    setEditValues({ ...item });
  };

  const updateStatus = async (id: string, tabKey: Tab, status: string) => {
    const type = tabToType(tabKey);
    setActionError(null);
    const res = await fetch("/api/admin/submissions/", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, type, status }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setActionError(data.error ?? "Unable to update status.");
      return;
    }
    await fetchData();
  };

  const saveItem = async () => {
    if (!selected) return;
    setActionError(null);
    const res = await fetch("/api/admin/submissions/", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selected.id, type: selectedType, ...editValues }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setActionError(data.error ?? "Unable to save.");
      return;
    }
    setSelected(null);
    setIsEditing(false);
    await fetchData();
  };

  const deleteItem = async (item: Record<string, unknown>, tabKey: Tab) => {
    const type = tabToType(tabKey);
    if (!window.confirm("Delete this record permanently?")) return;
    setActionError(null);
    const res = await fetch("/api/admin/submissions/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, type }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setActionError(data.error ?? "Unable to delete.");
      return;
    }
    if (selected?.id === item.id) {
      setSelected(null);
      setIsEditing(false);
    }
    await fetchData();
  };

  const inputClass =
    "w-full rounded-xl border border-emerald-900/15 bg-stone-50 px-3 py-2 text-sm text-emerald-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20";

  return (
    <div className="flex min-h-screen bg-stone-100">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-emerald-900/10 bg-emerald-950 text-white lg:flex">
        <div className="border-b border-white/10 px-6 py-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            {siteConfig.shortName}
          </p>
          <h1 className="mt-1 text-lg font-bold">Sales Admin</h1>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-emerald-800/80 px-4 py-3 text-sm font-medium">
            <LayoutDashboard className="h-4 w-4 text-emerald-300" />
            Dashboard
          </div>
        </nav>
        <div className="border-t border-white/10 p-4">
          <p className="text-xs text-emerald-300/80">{siteConfig.email}</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-emerald-900/10 bg-white px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 lg:hidden">
                {siteConfig.shortName}
              </p>
              <h2 className="text-xl font-bold text-emerald-950">Lead Inbox</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => void fetchData()}
                className="flex items-center gap-1.5 rounded-xl border border-emerald-900/10 px-3 py-2 text-sm text-emerald-900 hover:text-emerald-700"
              >
                <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
                Refresh
              </button>
              <AdminUserMenu />
            </div>
          </div>
        </header>

        <main className="flex-1 space-y-6 p-4 sm:p-6">
          {(loadError || actionError) && (
            <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">Admin data issue</p>
                <p className="mt-1">{loadError ?? actionError}</p>
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={FileText} label="New quote requests" value={newQuotes} sub="Awaiting follow-up" />
            <StatCard
              icon={Mail}
              label="New contact messages"
              value={newContacts}
              sub="Awaiting follow-up"
              tone="blue"
            />
            <StatCard icon={TrendingUp} label="Total quotes" value={quotes.length} tone="amber" />
            <StatCard icon={Mail} label="Total contacts" value={contacts.length} tone="stone" />
          </div>

          <div className="overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm">
            <div className="flex border-b border-emerald-900/10">
              {(
                [
                  ["quotes", "Quote requests", newQuotes],
                  ["contacts", "Contact messages", newContacts],
                ] as const
              ).map(([key, label, badge]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className={cn(
                    "px-5 py-3.5 text-sm font-semibold transition-colors",
                    tab === key
                      ? "border-b-2 border-emerald-600 text-emerald-700"
                      : "text-emerald-900/50 hover:text-emerald-950",
                  )}
                >
                  {label}
                  {badge > 0 && (
                    <span className="ml-2 rounded-full bg-emerald-600 px-1.5 py-0.5 text-xs text-white">
                      {badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <p className="py-12 text-center text-sm text-emerald-900/50">Loading…</p>
              ) : loadError ? (
                <p className="py-12 text-center text-sm text-emerald-900/50">
                  In Supabase → SQL Editor, run <code className="text-xs">prisma/supabase-init.sql</code>, or run{" "}
                  <code className="text-xs">npm run db:push</code> locally, then refresh.
                </p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-emerald-900/10 bg-stone-50">
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-emerald-900/50">
                        Name / Email
                      </th>
                      {tab === "quotes" && (
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-emerald-900/50">
                          Product
                        </th>
                      )}
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-emerald-900/50">
                        Subject
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-emerald-900/50">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-emerald-900/50">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-emerald-900/50">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-900/5">
                    {currentItems.map((item) => (
                      <tr key={String(item.id)} className="hover:bg-stone-50/80">
                        <td className="px-4 py-3">
                          <p className="font-medium text-emerald-950">{String(item.fullName)}</p>
                          <a href={`mailto:${item.email}`} className="text-xs text-emerald-600 hover:underline">
                            {String(item.email)}
                          </a>
                        </td>
                        {tab === "quotes" && (
                          <td className="px-4 py-3 text-emerald-900/70">{String(item.product ?? "-")}</td>
                        )}
                        <td className="max-w-[200px] truncate px-4 py-3 text-emerald-900/70">
                          {String(item.subject ?? "-")}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-emerald-900/50">
                          {formatDate(String(item.createdAt), { month: "short", day: "numeric" })}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={String(item.status ?? "")} />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              title="View"
                              onClick={() => openItem(item, tab, false)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-emerald-900/60 hover:bg-stone-100"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            {item.status === "NEW" && (
                              <button
                                type="button"
                                title="Mark read"
                                onClick={() => void updateStatus(String(item.id), tab, "READ")}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-emerald-900/60 hover:bg-stone-100"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              type="button"
                              title="Delete"
                              onClick={() => void deleteItem(item, tab)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {currentItems.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-10 text-center text-sm text-emerald-900/50">
                          No records yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-emerald-900/10 bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-emerald-900/10 bg-white px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-emerald-950">
                  {isEditing ? "Edit record" : "Record details"}
                </h2>
                <p className="text-sm text-emerald-900/50">{formatDate(String(selected.createdAt))}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelected(null);
                  setIsEditing(false);
                }}
                className="rounded-xl p-2 text-emerald-900/60 hover:bg-stone-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 p-6">
              {isEditing && selectedType === "quote" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {(
                    [
                      ["fullName", "Full name"],
                      ["email", "Email"],
                      ["phone", "Phone"],
                      ["subject", "Subject"],
                      ["product", "Product"],
                    ] as const
                  ).map(([key, label]) => (
                    <div key={key}>
                      <label className="mb-1 block text-xs font-semibold uppercase text-emerald-900/50">
                        {label}
                      </label>
                      <input
                        className={inputClass}
                        value={String(editValues[key] ?? "")}
                        onChange={(e) => setEditValues((c) => ({ ...c, [key]: e.target.value }))}
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-semibold uppercase text-emerald-900/50">
                      Enquiry
                    </label>
                    <textarea
                      rows={4}
                      className={inputClass}
                      value={String(editValues.enquiry ?? "")}
                      onChange={(e) => setEditValues((c) => ({ ...c, enquiry: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-emerald-900/50">
                      Status
                    </label>
                    <select
                      className={inputClass}
                      value={String(editValues.status ?? "NEW")}
                      onChange={(e) => setEditValues((c) => ({ ...c, status: e.target.value }))}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : isEditing && selectedType === "contact" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {(
                    [
                      ["fullName", "Full name"],
                      ["email", "Email"],
                      ["phone", "Phone"],
                      ["subject", "Subject"],
                    ] as const
                  ).map(([key, label]) => (
                    <div key={key}>
                      <label className="mb-1 block text-xs font-semibold uppercase text-emerald-900/50">
                        {label}
                      </label>
                      <input
                        className={inputClass}
                        value={String(editValues[key] ?? "")}
                        onChange={(e) => setEditValues((c) => ({ ...c, [key]: e.target.value }))}
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-semibold uppercase text-emerald-900/50">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className={inputClass}
                      value={String(editValues.message ?? "")}
                      onChange={(e) => setEditValues((c) => ({ ...c, message: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-emerald-900/50">
                      Status
                    </label>
                    <select
                      className={inputClass}
                      value={String(editValues.status ?? "NEW")}
                      onChange={(e) => setEditValues((c) => ({ ...c, status: e.target.value }))}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : selectedType === "quote" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <DetailField label="Full name" value={String(selected.fullName ?? "")} />
                  <DetailField label="Email" value={String(selected.email ?? "")} />
                  <DetailField label="Phone" value={String(selected.phone ?? "")} />
                  <DetailField label="Subject" value={String(selected.subject ?? "")} />
                  <DetailField label="Product" value={String(selected.product ?? "")} />
                  <DetailField label="Enquiry" value={String(selected.enquiry ?? "")} full />
                  <DetailField label="Status" value={<StatusBadge status={String(selected.status)} />} />
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  <DetailField label="Full name" value={String(selected.fullName ?? "")} />
                  <DetailField label="Email" value={String(selected.email ?? "")} />
                  <DetailField label="Phone" value={String(selected.phone ?? "")} />
                  <DetailField label="Subject" value={String(selected.subject ?? "")} />
                  <DetailField label="Message" value={String(selected.message ?? "")} full />
                  <DetailField label="Status" value={<StatusBadge status={String(selected.status)} />} />
                </div>
              )}

              <div className="flex flex-wrap justify-end gap-3 border-t border-emerald-900/10 pt-5">
                <button
                  type="button"
                  onClick={() => void deleteItem(selected, selectedTab)}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
                {isEditing ? (
                  <button
                    type="button"
                    onClick={() => void saveItem()}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
