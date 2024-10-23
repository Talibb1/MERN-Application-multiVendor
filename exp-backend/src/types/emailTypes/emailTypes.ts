export interface sendEmailParams {
    email: string;
    firstname: string;
    to: string;
    name?: string;
    customerName: string;
    otp?: string;       // Optional for OTP emails
    token?: string;     // Optional for password reset emails
    from: string;
    subject: string;
    html: string;
    replyTo: string;
  }
  