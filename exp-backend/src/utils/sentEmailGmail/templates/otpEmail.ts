import { sendEmailParams } from "../../../types/emailTypes/emailTypes";

export const otpTemplate = (params: sendEmailParams) => ({
  from: params.from,
  to: params.email,
  subject: `Your OTP code for ${params.customerName}`,
  bodyText: `Hello ${params.customerName},\nYour OTP code is: ${params.otp}\nPlease use this to verify your account.`,
  bodyHtml: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            width: 100%;
        }
        .otp {
            color: #4CAF50;
            font-size: 36px;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container" style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); width: 100%;">
        <h2 style="font-size: 24px; margin-bottom: 10px;">OTP Verification</h2>
        <p style="font-size: 16px;">Hello ${params.customerName},</p>
        <p style="font-size: 16px;">Please verify your email by using the OTP below:</p>
        <div class="otp" style="color: #4CAF50; font-size: 36px; text-align: center; margin: 20px 0;">${params.otp}</div>
        <p style="font-size: 16px;">If you did not request this OTP, please ignore this email.</p>
        <div class="footer" style="text-align: center; margin-top: 30px; font-size: 12px; color: #666;">
            <p>&copy; 2024 w11stop</p>
        </div>
    </div>
</body>
</html>`,
});
