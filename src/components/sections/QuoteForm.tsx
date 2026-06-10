"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Loader2, Send } from "lucide-react";
import { submitQuoteForm } from "@/actions/contact";
import {
  FormAlert,
  FormField,
  FormHeader,
  formInputClass,
} from "@/components/forms/FormField";
import { quoteSchema, type QuoteFormData } from "@/lib/validations/contact";
import { cn } from "@/lib/utils";

interface QuoteFormProps {
  productName?: string;
  className?: string;
}

export function QuoteForm({ productName, className }: QuoteFormProps) {
  const defaults = useMemo<QuoteFormData>(
    () => ({
      name: "",
      email: "",
      phone: "",
      product: productName,
      subject: productName ? `Quote request: ${productName}` : "Product enquiry",
      enquiry: "",
    }),
    [productName],
  );

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: defaults,
  });

  const onSubmit = async (data: QuoteFormData) => {
    setStatus("idle");
    setServerError(null);
    const result = await submitQuoteForm(data);

    if ("success" in result && result.success) {
      setStatus("success");
      reset(defaults);
      return;
    }

    setStatus("error");
    setServerError("error" in result ? result.error : "Something went wrong.");
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-lg shadow-emerald-950/5",
        className,
      )}
    >
      <div className="p-6 md:p-8">
        <FormHeader
          icon={FileText}
          title="Request a Quote"
          description="Share your requirements and we'll respond with wholesale pricing, MOQ, and shipping options."
          badge={productName}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
          <input type="hidden" {...register("product")} />

          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Full name" htmlFor="quote-name" required error={errors.name?.message}>
              <input
                id="quote-name"
                className={formInputClass}
                autoComplete="name"
                {...register("name")}
              />
            </FormField>
            <FormField label="Email address" htmlFor="quote-email" required error={errors.email?.message}>
              <input
                id="quote-email"
                type="email"
                className={formInputClass}
                autoComplete="email"
                {...register("email")}
              />
            </FormField>
            <FormField label="Phone / WhatsApp" htmlFor="quote-phone" required error={errors.phone?.message}>
              <input
                id="quote-phone"
                type="tel"
                className={formInputClass}
                autoComplete="tel"
                placeholder="+66 ..."
                {...register("phone")}
              />
            </FormField>
            <FormField label="Subject" htmlFor="quote-subject" required error={errors.subject?.message}>
              <input id="quote-subject" className={formInputClass} {...register("subject")} />
            </FormField>
          </div>

          <FormField label="Enquiry details" htmlFor="quote-enquiry" required error={errors.enquiry?.message}>
            <textarea
              id="quote-enquiry"
              rows={5}
              className={cn(formInputClass, "resize-y min-h-[140px]")}
              placeholder="Quantity needed, destination port, packaging preference, timeline..."
              {...register("enquiry")}
            />
          </FormField>

          {status === "success" && (
            <FormAlert
              variant="success"
              title="Quote request received"
              message="Thank you! Check your inbox for a confirmation email. Our team will send pricing details soon."
            />
          )}
          {status === "error" && (
            <FormAlert
              variant="error"
              title="Unable to send"
              message={serverError ?? "Please try again or reach us via WhatsApp."}
            />
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-900/15 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" aria-hidden="true" />
                Request Quote
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
