import { sendEmailParams } from "../../../types/emailTypes/emailTypes";

export const otpTemplate = (params: sendEmailParams) => ({
  subject: `Your OTP code for ${params.name}`,
  bodyText: `Hello ${params.name},\nYour OTP code is: ${params.otp}\nPlease use this to verify your account.`,
  bodyHtml: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333333;
        }
        p {
            color: #666666;
        }
        .otp {
            color: #4CAF50;
            font-size: 36px;
            text-align: center;
            margin: 20px 0;
        }
        .app-links {
            text-align: center;
            margin: 20px 0;
        }
        .app-links img {
            width: 100px; /* Size ko chhota kar diya gaya hai */
            height: auto; /* Aspect ratio maintain rakha gaya hai */
            margin: 0 10px; /* Icons ke beech mein margin */
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #666666;
            font-size: 12px; /* Adjust font size as needed */
        }
        .logo {
            text-align: center;
            margin-bottom: 20px;
        }
        .logo img {
            width: 200px; /* Logo ka size */
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="../images/logo.png" alt="Comply Logo">
        </div>
        <h2>OTP Verification</h2>
        <p>Hi ${params.name},</p>
        <p>Thank you for signing up! Please verify your email address by entering the OTP below:</p>

        <div class="otp">${params.otp}</div>

        <p>This OTP is valid for the next 5 minutes.</p>
        <p>If you did not request this OTP, please ignore this email.</p>

        <h3>Download Our App</h3>
        <div class="app-links">
            <a href="https://play.google.com/store">
                <img src="../images/playstore.png" alt="Get it on Google Play">
            </a>
            <a href="https://www.apple.com/app-store/">
                <img src="../images/appstore.png" alt="Download on the App Store">
            </a>
        </div>

        <div class="footer">
            <p>Help Centre: <a href="https://help.w11stop.com" style="color: #4CAF50; text-decoration: none;">help.w11stop.com</a></p>
            <p>You are receiving this email as you're registered on w11stop.com.</p>
            <p><a href="">Privacy Policy</a> | <a href="">Terms of Use</a> | <a href="">Terms of Sale</a></p>
            <p>Copyright © 2024 w11stop</p>
            <p>Thank you!</p>
        </div>
    </div>
</body>
</html>
`,
});
