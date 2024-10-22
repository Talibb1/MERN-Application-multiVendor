import { z } from "zod";

export const UpdateTableSchema = z.object({
  companyName: z.string().min(1, "Company Name is required."),
  phone: z.string().optional(),
  status: z.enum(["Potential", "Bad Fit", "Qualified", "Customer", "Interested", "Canceled", "Not Interested"]),
  industry: z.string().optional(),
  source: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  website: z.string().url("Invalid URL").optional(),
  description: z.string().optional(),
});



export const updatedSchema = z.object({
  email: z.string().email("Invalid email address"),
  category: z.string().nonempty("Please select a category"),
});