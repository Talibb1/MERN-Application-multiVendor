export const otpEmail = ({ firstName, otp }: { firstName: string; otp: string }) => ({
    subject: 'Your OTP Code',
    body: `
      <p>Hello ${firstName},</p>
      <p>Your OTP code is: <strong>${otp}</strong></p>
      <p>Thank you!</p>
    `,
  });
  