import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Customer } from '../../../models/Customer';
import { SALT, JWT_ACCESS_KEY } from '../../../config/env';
import logger from '../../../logs/logger';
import { CustomerActivity, ActivityType } from '../../../models/Customer';

interface PasswordResetRequestBody {
  _id: string;
  token: string;
  Password: string;
  ConfirmPassword: string;
}
export const PasswordResetCustomer = async (req: Request<{}, {}, PasswordResetRequestBody>, res: Response): Promise<Response> => {
  try {
    const { _id, token, Password, ConfirmPassword } = req.body;
    if (!Password || !ConfirmPassword) {
      logger.warn("Password reset attempt with missing fields.");
      return res.status(400).json({
        status: 'failed',
        message: 'Password and Confirm Password are required',
      });
    }

    if (Password !== ConfirmPassword) {
      logger.warn(`Password mismatch during reset for user: ${_id}`);
      return res.status(400).json({
        status: 'failed',
        message: 'Passwords do not match',
      });
    }
    if (!_id || !token) {
      logger.warn("Password reset attempt with missing User ID or Token.");
      return res.status(400).json({
        status: 'failed',
        message: 'User ID and Token are required',
      });
    }

    const customer = await Customer.findById(_id); 

    if (!customer) {
      logger.warn(`Password reset attempt for non-existent user: ${_id}`);
      return res.status(404).json({
        status: 'failed',
        message: 'User not found',
      });
    }
    try {
      const newSecret = customer.id.toString() + JWT_ACCESS_KEY;
      jwt.verify(token, newSecret);
    } catch (err) {
      logger.error(`Invalid token for password reset for user: ${_id}`);
      return res.status(401).json({
        status: 'failed',
        message: 'Invalid or expired token',
      });
    }
    const salt = await bcrypt.genSalt(Number(SALT));
    const hashedPassword = await bcrypt.hash(Password, salt);
    await Customer.findByIdAndUpdate(_id, { password: hashedPassword });

    // Save activity for password reset
    await CustomerActivity.create({
      customerId: _id,
      activityType: ActivityType.UPDATE_PROFILE, // You can choose a relevant type
      activityData: {
        action: 'Password reset',
        timestamp: new Date(),
      },
    });

    return res.status(200).json({
      status: 'success',
      message: 'Password reset successfully',
    });
  } catch (error: any) {
    logger.error(`Error resetting password for user ${req.body._id}: ${error.message}`);
    return res.status(500).json({
      status: 'failed',
      message: 'Error resetting password. Please try again later.',
    });
  }
};
