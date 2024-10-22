import { z } from "zod";

export const LeadesSchema = z.object({
  contactName: z.string().min(1, { message: "Contact Name is required" }),
  title: z.string().min(1, { message: "Title is required" }).optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .optional(),
  position: z.string().optional(),
  contactDetails: z.string().optional(),
});

export const UpdateContactSchema = z.object({
  contactName: z.string().min(1, "Contact name is required"),
  title: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().optional(),
  position: z.string().optional(),
  contactDetails: z.string().optional(),
});
