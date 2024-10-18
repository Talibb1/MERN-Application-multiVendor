import { NEXT_API_BASE_URL } from "../../constants";
import sendEmail from "./sendEmail";

export const sendWelcomeEmail = async (
  email: string,
  name: string,
  organizationName: string
) => {
  const subject = `Welcome to ${organizationName}`;
  const text = `Hello ${name},\n\nYou have been added to the organization "${organizationName}".`;
  const inviteUrl = `${NEXT_API_BASE_URL}/dashboard`;
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body style="margin: 0; font-family: 'Poppins', sans-serif; background: #ffffff; font-size: 14px;">
    <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f4f7ff; font-size: 14px; color: #434343;">
      <header style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 24px; font-weight: 500; color: #1f1f1f;">${name}, you've been invited to join ${organizationName}!</h1>
        <p style="color: #6b6b6b;">Use this platform to collaborate with your team and manage tasks effectively.</p>
      </header>

 <main style="text-align: center; margin: 40px 0;">
  <a href="${inviteUrl}" 
     style="display: block; width: fit-content; margin: 0 auto; padding: 14px 24px; background-color: #3b5998; color: #fff; text-decoration: none; font-size: 16px; border-radius: 4px; font-weight: 500; text-align: center;">
     JOIN YOUR TEAM
   </a>
   </main>

      <footer style="text-align: center; margin-top: 60px;">
        <a href="#" style="color: #499fb6; text-decoration: none; font-size: 14px;">Manage your email preferences</a>
      </footer>
    </div>
  </body>
</html>`;

  await sendEmail({ to: email, subject, text, htmlContent });
};

export default sendWelcomeEmail;
