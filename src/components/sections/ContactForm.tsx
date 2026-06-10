"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { submitContactForm } from "@/actions/contact";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import { cn } from "@/lib/utils";
import { defaultTransition, easeOut, fadeUp, staggerContainer } from "@/lib/motion";

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: "General enquiry" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("idle");
    const result = await submitContactForm(data);
    if ("success" in result && result.success) {
      setStatus("success");
      reset({ subject: "General enquiry" });
    } else {
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-emerald-900/15 bg-white px-4 py-3 text-sm text-emerald-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={staggerContainer(0.08, 0)}
      className={cn(
        "rounded-2xl border border-emerald-900/10 bg-stone-50 p-6 md:p-8",
        className,
      )}
    >
      <motion.h2
        variants={fadeUp}
        transition={{ ...defaultTransition, ease: easeOut }}
        className="text-xl font-bold text-emerald-950"
      >
        Send a Message
      </motion.h2>
      <motion.p
        variants={fadeUp}
        transition={{ ...defaultTransition, ease: easeOut }}
        className="mt-1 text-sm text-emerald-900/70"
      >
        Fill in your details and our team will respond with pricing, availability, or any
        questions you have.
      </motion.p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <motion.div
          variants={fadeUp}
          transition={{ ...defaultTransition, ease: easeOut }}
          className="grid gap-4 md:grid-cols-2"
        >
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
            <label className="mb-1.5 block text-sm font-medium text-emerald-900">Phone *</label>
            <input className={fieldClass} {...register("phone")} />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-emerald-900">Subject *</label>
            <input className={fieldClass} {...register("subject")} />
            {errors.subject && (
              <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>
            )}
          </div>
        </motion.div>
        <motion.div variants={fadeUp} transition={{ ...defaultTransition, ease: easeOut }}>
          <label className="mb-1.5 block text-sm font-medium text-emerald-900">Message *</label>
          <textarea rows={5} className={fieldClass} {...register("message")} />
          {errors.message && (
            <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
          )}
        </motion.div>

        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-emerald-100 px-4 py-3 text-sm text-emerald-800"
          >
            Thank you! Your message has been sent. We will contact you shortly.
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            Something went wrong. Please try again or reach us via WhatsApp.
          </motion.p>
        )}

        <motion.div variants={fadeUp} transition={{ ...defaultTransition, ease: easeOut }}>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60 md:w-auto"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
}
