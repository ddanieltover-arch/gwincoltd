import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const quoteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  subject: z.string().min(3, "Subject is required"),
  enquiry: z.string().min(10, "Enquiry must be at least 10 characters"),
  product: z.string().optional(),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;
