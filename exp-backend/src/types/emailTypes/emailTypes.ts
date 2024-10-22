export interface sendEmailParams {
    email: string;
    name: string;
    to: string;
    customerName: string;
    otp?: string;       // Optional for OTP emails
    token?: string;     // Optional for password reset emails
    from: string;
    subject: string;
    html: string;
    replyTo: string;
  }
  