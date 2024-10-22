import nodemailer from 'nodemailer';
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER } from "./env";
// Create a nodemailer transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: parseInt(EMAIL_PORT || '587', 10),
  secure: EMAIL_PORT === '465',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

export default transporter;
