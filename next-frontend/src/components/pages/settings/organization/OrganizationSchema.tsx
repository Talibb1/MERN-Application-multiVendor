import { z } from "zod";

export const OrganizationSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Organization name must be at least 2 characters long" })
    .max(50, { message: "Organization name must not exceed 50 characters" })
    .nonempty({ message: "Organization name is required" }),
});
