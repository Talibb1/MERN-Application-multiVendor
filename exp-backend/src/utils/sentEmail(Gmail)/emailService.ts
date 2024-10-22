import transporter from '../../config/googleEmailConfig';
import { sendEmailParams } from '../../types/emailTypes/emailTypes';
import * as templates from './templates'; // Dynamic templates
import logger from '../../logs/logger'; // Winston logger
import { AppError } from '../../middleware/errors'; // Custom AppError

export const sendEmail = async (emailType: string, params: sendEmailParams) => {
  try {
    // Generate email content dynamically based on the email type
    const emailContent = templates[emailType](params);
    
    // Email options for sending
    const mailOptions = {
      from: params.from || 'noreply@example.com', // Set a default 'from' email
      to: params.email,
      replyTo: params.replyTo || 'support@example.com', // Default replyTo if not provided
      subject: emailContent.subject,
      text: emailContent.bodyText || emailContent.body, // Fallback to body if text isn't provided
      html: emailContent.bodyHtml || emailContent.body, // Fallback to body if HTML isn't provided
    };

    // Sending the email
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.response}`);
  } catch (error) {
    logger.error('Error sending email:', error); // Log the error for debugging
    throw new AppError('Could not send email. Please try again later.', 500); // Custom error handling
  }
};
