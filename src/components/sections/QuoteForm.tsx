"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitQuoteForm } from "@/actions/contact";
import { quoteSchema, type QuoteFormData } from "@/lib/validations/contact";
import { cn } from "@/lib/utils";

interface QuoteFormProps {
  productName?: string;
  className?: string;
}

export function QuoteForm({ productName, className }: QuoteFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      product: productName,
      subject: productName ? `Quote request: ${productName}` : "Product enquiry",
    },
  });

  const onSubmit = async (data: QuoteFormData) => {
    setStatus("idle");
    const result = await submitQuoteForm(data);
    if ("success" in result && result.success) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-emerald-900/15 bg-white px-4 py-3 text-sm text-emerald-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("rounded-2xl border border-emerald-900/10 bg-stone-50 p-6 md:p-8", className)}
    >
      <h3 className="text-xl font-bold text-emerald-950">Product Enquiry</h3>
      <p className="mt-1 text-sm text-emerald-900/70">
        Fill in your details and our team will respond with pricing and availability.
      </p>

      <input type="hidden" {...register("product")} />

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-emerald-900">Name *</label>
          <input className={fieldClass} {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-emerald-900">Email *</label>
          <input type="email" className={fieldClass} {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-emerald-900">Mobile Number *</label>
          <input className={fieldClass} {...register("phone")} />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-emerald-900">Subject *</label>
          <input className={fieldClass} {...register("subject")} />
          {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-emerald-900">Enquiry *</label>
          <textarea rows={4} className={fieldClass} {...register("enquiry")} />
          {errors.enquiry && <p className="mt-1 text-xs text-red-600">{errors.enquiry.message}</p>}
        </div>
      </div>

      {status === "success" && (
        <p className="mt-4 rounded-lg bg-emerald-100 px-4 py-3 text-sm text-emerald-800">
          Thank you! Your enquiry has been sent. We will contact you shortly.
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Something went wrong. Please try again or reach us via WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60 md:w-auto"
      >
        {isSubmitting ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
