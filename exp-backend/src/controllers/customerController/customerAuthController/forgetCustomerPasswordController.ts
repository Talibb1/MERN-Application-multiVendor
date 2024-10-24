import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Customer } from "../../../models/Customer";
import { AppError } from "../../../middleware/errors";
import logger from "../../../logs/logger";
import { JWT_ACCESS_KEY } from "../../../config";
import { sendEmail } from "../../../utils/sentEmailGmail/emailService";

export const ForgetCustomerPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { email } = req.body;

    // Input validation
    if (!email) {
      return res.status(400).json({
        status: 'failed',
        message: 'Email address is required.',
      });
    }

    // Optimize query by only selecting required fields (projection)
    const customer = await Customer.findOne({ email }, '_id email password firstname');

    if (!customer || !customer.password) {
      return res.status(404).json({
        status: 'failed',
        message: 'No account associated with this email address.',
      });
    }

    // Assert type of customer._id
    const customerId = customer._id as string;

    // Ensure JWT_ACCESS_KEY is defined or provide a fallback value
    const secretToken = customerId + (JWT_ACCESS_KEY);
    const token = jwt.sign({ userId: customerId }, secretToken, {
      expiresIn: "25m",
    });

    // Prepare email parameters
    const emailParams = {
      email: customer.email,
      firstname: customer.firstname,
      from: "your-email@example.com",
      to: customer.email,
      customerName: customer.firstname,
      subject: "Password Reset Instructions",
      html: `<p>Hi ${customer.firstname},</p>
             <p>To reset your password, please click the link below:</p>
             <a href="http://localhost:3000/reset-password/${token}">Reset Password</a>
             <p>If you did not request this, please ignore this email.</p>`,
      replyTo: "support@example.com",
    };
    await sendEmail("passwordResetTemplate", emailParams);

    return res.status(200).json({
      status: "success",
      message: "Password reset instructions have been sent to your email.",
    });
  } catch (error: any) {
    if (error instanceof AppError && error.isOperational) {
      logger.error(`Operational Error: ${error.message}`, {
        statusCode: error.statusCode,
        stack: error.stack,
      });
      return res.status(error.statusCode).json({
        status: "failed",
        message: error.message,
      });
    }
    logger.error("Internal Server Error:", {
      message: error.message,
      stack: error.stack,
    });
    return next(new AppError("An internal server error occurred", 500));
  }
};
