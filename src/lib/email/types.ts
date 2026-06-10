export type FormEmailType = "contact" | "quote";

export interface FormEmailPayload {
  type: FormEmailType;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  product?: string;
}
