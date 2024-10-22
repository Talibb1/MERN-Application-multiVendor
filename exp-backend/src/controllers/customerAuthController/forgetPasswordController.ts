import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { passwordResetTemplate } from "../../utils/sentEmailGmail/emailService";
import { Customer } from "../../models/Customer";
import { AppError } from "../../middleware/errors";
import logger from "../../logs/logger";
import { JWT_ACCESS_KEY } from "../../config";

export const ForgetCustomerPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { email } = req.body;

    // Input validation
    if (!email) {
      return next(new AppError("Email address is required.", 400));
    }

    // Find customer by email
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return next(
        new AppError("No account associated with this email address.", 404)
      );
    }

    if (!customer.password) {
      return next(
        new AppError("No account associated with this email address.", 404)
      );
    }

    // Generate password reset token
    const secretToken = customer.id + JWT_ACCESS_KEY;
    const token = jwt.sign({ userId: customer.id }, secretToken, {
      expiresIn: "25m",
    });

    // Send password reset email
    // await passwordResetTemplate(customer.email, token, customer.firstName);

    return res.status(200).json({
      status: "success",
      message: "Password reset instructions have been sent to your email.",
    });
  } catch (error: any) {
    // Log operational errors directly
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

    // Log unknown or internal server errors
    logger.error("Internal Server Error:", {
      message: error.message,
      stack: error.stack,
    });

    // Pass to next middleware with generic message
    return next(new AppError("An internal server error occurred", 500));
  }
};
