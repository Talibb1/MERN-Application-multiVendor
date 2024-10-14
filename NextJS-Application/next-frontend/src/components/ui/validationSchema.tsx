import { z } from "zod";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const ValidationSignup = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(EMAIL_REGEX, "Invalid email format"),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(PASSWORD_REGEX, "Password must be Strong"),
});

export const ValidationLogin = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(EMAIL_REGEX, "Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const ValidationForgotPass = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(EMAIL_REGEX, "Invalid email format"),
});

export const LeadesSchema = z.object({
  companyName: z.string().min(1, "Company is required"),
  contactName: z.string().min(1, "Contact is required"),
});

export const ChangepasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Old password is required and must be 6+ characters"),
    newPassword: z
      .string()
      .min(6, "Password must be minimum 6+ characters")
      .regex(PASSWORD_REGEX, "Password must contain both letters and numbers"),
    newPasswordConfirmation: z.string(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: "Passwords don't match",
    path: ["newPasswordConfirmation"],
  });

export const UpdateTableSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  status: z.enum([
    "Potential",
    "Bad Fit",
    "Qualified",
    "Customer",
    "Interested",
    "Canceled",
    "Not Interested",
  ]),
});

export const ContactSchema = z.object({
  contacts: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email").min(1, "Email is required"),
      phone: z.string().min(1, "Phone is required"),
    })
  ),
});

export const OpportunitySchema = z.object({
  opportunities: z.array(
    z.object({
      status: z.string().min(1, "Status is required"),
      estimatedClose: z.string().min(1, "Estimated Close is required"),
      value: z.number().positive("Value must be positive"),
      contact: z.string().min(1, "Contact is required"),
      user: z.string().min(1, "User is required"),
      notes: z.string().optional(),
    })
  ),
});

export const TaskSchema = z.object({
  tasks: z.array(
    z.object({
      description: z.string().min(1, "Task Description is required"),
      date: z.string().min(1, "Date is required"),
      time: z.string().min(1, "Time is required"),
      assignUser: z.string().min(1, "Assign User is required"),
    })
  ),
});
