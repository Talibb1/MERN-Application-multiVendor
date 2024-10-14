import * as z from "zod";

// Validation schema for the contact form
export const ContactSchema = z.object({
  contactName: z.string().nonempty({ message: "Contact name is required" }),
  title: z.string().optional(),
  contactDetails: z.string().optional(),
  email: z
    .string()
    .optional()
    .refine((val) => !val || /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(val), {
      message: "Invalid email address",
    }),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?\d{10,15}$/.test(val), {
      message: "Invalid phone number",
    }),
  position: z.string().optional(),
});
