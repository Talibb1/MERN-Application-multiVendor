import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { Customer } from "../../models/Customer";
import { CustomerActivity, ActivityType } from '../../models/Customer'; // Import the activity model
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
    if (!currentPassword || !newPassword || !newPasswordConfirmation) {
      return res.status(400).json({
        status: "failed",
        message: "All fields are required",
      });
    }

    if (newPassword !== newPasswordConfirmation) {
      return res.status(400).json({
        status: "failed",
        message: "New password and confirmation do not match",
      });
    }

    if (!req.id) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized, user ID not found",
      });
    }

    const customer = await Customer.findById(req.id).select("password");

    if (!customer) {
      return res.status(404).json({
        status: "failed",
        message: "Customer not found",
      });
    }

    if (!customer.password) {
      return res.status(400).json({
        status: "failed",
        message: "No password is set for this user",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, customer.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "failed",
        message: "Current password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(Number(SALT));
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    await Customer.findByIdAndUpdate(
      req.id,
      { password: hashedNewPassword, updatedAt: new Date() },
      { new: true, useFindAndModify: false }
    );

    // Save password change activity
    await CustomerActivity.create({
      customerId: customer._id,
      activityType: ActivityType.UPDATE_PROFILE, // Use appropriate activity type
      activityData: {
        action: 'Password changed',
        timestamp: new Date(),
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Password changed successfully",
    });
  } catch (error) {
    logger.error("Error changing password:", error);
    return next(new AppError("An internal server error occurred", 500));
  }
};
