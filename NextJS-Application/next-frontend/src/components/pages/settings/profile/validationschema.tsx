import { z } from "zod";


export const ProfileSchema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    zipcode: z.string().optional(),
    company: z.string().optional(),
    role: z.string().optional(),
    banned: z.boolean(),
    emailVerified: z.boolean(),
  });