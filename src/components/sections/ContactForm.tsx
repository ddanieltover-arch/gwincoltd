"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, Send } from "lucide-react";
import { submitContactForm } from "@/actions/contact";
import {
  FormAlert,
  FormField,
  FormHeader,
  formInputClass,
} from "@/components/forms/FormField";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  className?: string;
}

const defaultValues: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "General enquiry",
  message: "",
};

export function ContactForm({ className }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("idle");
    setServerError(null);
    const result = await submitContactForm(data);

    if ("success" in result && result.success) {
      setStatus("success");
      reset(defaultValues);
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
          icon={Mail}
          title="Send a Message"
          description="Tell us what you need — pricing, availability, shipping, or a general question. We reply within 24 business hours."
        />

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Full name" htmlFor="contact-name" required error={errors.name?.message}>
              <input
                id="contact-name"
                className={formInputClass}
                autoComplete="name"
                {...register("name")}
              />
            </FormField>
            <FormField label="Email address" htmlFor="contact-email" required error={errors.email?.message}>
              <input
                id="contact-email"
                type="email"
                className={formInputClass}
                autoComplete="email"
                {...register("email")}
              />
            </FormField>
            <FormField label="Phone / WhatsApp" htmlFor="contact-phone" required error={errors.phone?.message}>
              <input
                id="contact-phone"
                type="tel"
                className={formInputClass}
                autoComplete="tel"
                placeholder="+66 ..."
                {...register("phone")}
              />
            </FormField>
            <FormField label="Subject" htmlFor="contact-subject" required error={errors.subject?.message}>
              <input id="contact-subject" className={formInputClass} {...register("subject")} />
            </FormField>
          </div>

          <FormField label="Your message" htmlFor="contact-message" required error={errors.message?.message}>
            <textarea
              id="contact-message"
              rows={5}
              className={cn(formInputClass, "resize-y min-h-[140px]")}
              placeholder="Tell us about quantities, destination country, product interest..."
              {...register("message")}
            />
          </FormField>

          {status === "success" && (
            <FormAlert
              variant="success"
              title="Message sent successfully"
              message="Thank you! A confirmation email is on its way. Our export team will contact you shortly."
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
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
