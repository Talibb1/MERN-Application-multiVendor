import { sendEmailParams } from "../../../types/emailTypes/emailTypes";

export const welcomeTemplate = (params: sendEmailParams) => ({
    subject: `Your OTP code for ${params.firstname}`,
    bodyText: `Hello ${params.firstname},\nYour OTP code is: ${params.otp}\nPlease use this to verify your account.`,
    bodyHtml: `<p>Hello <strong>${params.firstname}</strong>,</p><p>Your OTP code is: <strong>${params.otp}</strong></p><p>Please use this to verify your account.</p>`
  });
  