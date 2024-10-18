export const resetPasswordEmail = ({ firstName, token }: { firstName: string; token: string }) => ({
    subject: 'Password Reset Request',
    body: `
      <p>Hello ${firstName},</p>
      <p>We received a request to reset your password. Please click the link below to reset it:</p>
      <a href="https://your-domain.com/reset-password?token=${token}">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Thank you!</p>
    `,
  });
  