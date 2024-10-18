import transporter from '../../config/googleEmailConfig';
import { sendEmailParams } from '../../types/emailTypes/emailTypes';
import * as templates from './templates';

export const sendEmail = async (emailType: string, params: sendEmailParams) => {
  const emailContent = templates[emailType](params);

  const mailOptions = {
    from: 'your-email@gmail.com', 
    to: params.email,
    subject: emailContent.subject,
    html: emailContent.body,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Could not send email.');
  }
};
