import type { ComponentType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

export function FormField({
  label,
  htmlFor,
  error,
  required,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-emerald-950">
        {label}
        {required && <span className="text-emerald-600"> *</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export const formInputClass =
  "w-full rounded-xl border border-emerald-900/15 bg-white px-4 py-3 text-sm text-emerald-950 shadow-sm outline-none transition placeholder:text-emerald-900/40 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20";

export function FormAlert({
  variant,
  title,
  message,
}: {
  variant: "success" | "error";
  title: string;
  message: string;
}) {
  const styles =
    variant === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : "border-red-200 bg-red-50 text-red-900";

  return (
    <div className={cn("rounded-xl border px-4 py-3", styles)} role="alert">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm opacity-90">{message}</p>
    </div>
  );
}

export function FormHeader({
  icon: Icon,
  title,
  description,
  badge,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <div className="border-b border-emerald-900/10 pb-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-md shadow-emerald-900/15">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold text-emerald-950">{title}</h2>
            {badge && (
              <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-semibold text-emerald-800">
                {badge}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-emerald-800">{description}</p>
        </div>
      </div>
    </div>
  );
}
