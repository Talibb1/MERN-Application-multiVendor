// import AWS from 'aws-sdk';

// // Configure AWS SDK
// AWS.config.update({
//   region: 'your-region', 
//   accessKeyId: 'your-access-key-id',
//   secretAccessKey: 'your-secret-access-key',
// });

// const ses = new AWS.SES();

// export const sendPasswordResetEmail = async (email: string, token: string, firstName: string) => {
//   const params = {
//     Source: 'your-verified-email@example.com',
//     Destination: {
//       ToAddresses: [email],
//     },
//     Message: {
//       Subject: {
//         Data: 'Password Reset Request',
//         Charset: 'UTF-8',
//       },
//       Body: {
//         Html: {
//           Data: `
//             <p>Hello ${firstName},</p>
//             <p>We received a request to reset your password. Please click the link below to reset it:</p>
//             <a href="https://your-domain.com/reset-password?token=${token}">Reset Password</a>
//             <p>If you didn't request this, please ignore this email.</p>
//             <p>Thank you!</p>
//           `,
//           Charset: 'UTF-8',
//         },
//       },
//     },
//   };

//   try {
//     await ses.sendEmail(params).promise();
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw new Error('Could not send password reset email.');
//   }
// };
