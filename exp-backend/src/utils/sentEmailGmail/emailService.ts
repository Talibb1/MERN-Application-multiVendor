import transporter from '../../config/googleEmailConfig';
import { sendEmailParams } from '../../types/emailTypes/emailTypes';
import  {otpTemplate} from './templates'; // Import your templates
import  {passwordResetTemplate} from './templates'; // Example for another template
import logger from '../../logs/logger'; // Winston logger
import { AppError } from '../../middleware/errors'; // Custom AppError

// A map of templates for easier selection
const templates = {
  otpTemplate: otpTemplate,
  passwordResetTemplate: passwordResetTemplate,
  // Add more templates as needed
};

export const sendEmail = async (emailType: keyof typeof templates, params: sendEmailParams) => {
  try {
    // Dynamically call the corresponding template
    const selectedTemplate = templates[emailType];

    if (!selectedTemplate) {
      throw new Error(`Template for ${emailType} not found`);
    }
    const emailContent = selectedTemplate(params);

    // Email options for sending
    const mailOptions = {
      from: params.from,
      to: params.email,
      replyTo: params.replyTo || 'support@example.com',
      subject: emailContent.subject,
      text: emailContent.bodyText,
      html: emailContent.bodyHtml,
    };

    // Sending the email
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.response}`);
  } catch (error) {
    logger.error('Error sending email:', error); // Log the error for debugging
    throw new AppError('Could not send email. Please try again later.', 500); // Custom error handling
  }
};
