import { sendEmailParams } from "../../../types/emailTypes/emailTypes";

export const welcomeTemplate = (params: sendEmailParams) => ({
    subject: `Your OTP code for ${params.name}`,
    bodyText: `Hello ${params.name},\nYour OTP code is: ${params.otp}\nPlease use this to verify your account.`,
    bodyHtml: `<p>Hello <strong>${params.name}</strong>,</p><p>Your OTP code is: <strong>${params.otp}</strong></p><p>Please use this to verify your account.</p>`
  });
  