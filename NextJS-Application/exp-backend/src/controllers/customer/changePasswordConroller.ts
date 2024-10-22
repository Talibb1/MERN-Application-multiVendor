import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { Customer } from "../../models/customer";
import { SALT } from "../../config";
import { AppError } from "../../middleware/errors";
import logger from "../../logs/logger";

interface AuthenticatedRequest extends Request {
  id?: string;
}

export const ChangeCustomerPassword = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { currentPassword, newPassword, newPasswordConfirmation } = req.body;

    // Validate input fields
    if (!currentPassword || !newPassword || !newPasswordConfirmation) {
      return next(new AppError("All fields are required", 400));
    }

    if (newPassword !== newPasswordConfirmation) {
      return next(
        new AppError("New password and confirmation do not match", 400)
      );
    }

    if (!req.id) {
      return next(new AppError("Unauthorized, user ID not found", 401));
    }

    // Find customer and fetch only the password field to reduce data load
    const customer = await Customer.findById(req.id).select("password");

    if (!customer) {
      return next(new AppError("Customer not found", 404));
    }

    // Check if the customer has a password set (handle undefined case)
    if (!customer.password) {
      return next(new AppError("No password is set for this user", 400));
    }

    // Compare current password (since password is confirmed to be non-undefined)
    const isMatch = await bcrypt.compare(currentPassword, customer.password);
    if (!isMatch) {
      return next(new AppError("Current password is incorrect", 401));
    }

    // Hash new password
    const salt = await bcrypt.genSalt(Number(SALT));
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update password in a single step
    await Customer.findByIdAndUpdate(
      req.id,
      { password: hashedNewPassword, updatedAt: new Date() },
      { new: true, useFindAndModify: false }
    );

    return res.status(200).json({
      status: "success",
      message: "Password changed successfully",
    });
  } catch (error) {
    logger.error("Error changing password:", error);
    return next(new AppError("An internal server error occurred", 500));
  }
};
