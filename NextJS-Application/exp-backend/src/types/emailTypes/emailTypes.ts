export interface sendEmailParams {
    email: string;
    firstName: string;
    otp?: string;       // Optional for OTP emails
    token?: string;     // Optional for password reset emails
  }
  