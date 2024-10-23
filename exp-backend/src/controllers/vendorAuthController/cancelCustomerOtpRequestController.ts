import { Request, Response } from 'express';
import { Customer } from '../../models/Customer';
import { Otp } from '../../models/OtpVerification';
import logger from '../../logs/logger';

export const CancelOtpRequest = async (req: Request, res: Response): Promise<Response> => {
  const { email }: { email: string } = req.body;

  // Input validation
  if (!email) {
    return res.status(400).json({
      status: 'failed',
      message: 'Email is required.',
    });
  }

  try {
    // Step 1: Find the customer using only the _id field (projection for performance)
    const customer = await Customer.findOne({ email }, '_id').lean();

    if (!customer) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found.',
      });
    }

    // Step 2: Delete OTP record associated with the customer
    const result = await Otp.deleteOne({ customerId: customer._id });

    // Step 3: Check if OTP was deleted
    if (result.deletedCount > 0) {
      logger.info(`Deleted OTP for customerId: ${customer._id}`);
    } else {
      logger.warn(`No OTP found for customerId: ${customer._id}`);
    }

    // Step 4: Return success response
    return res.status(200).json({
      status: 'success',
      message: 'User registration canceled.',
    });
  } catch (error: any) {
    // Log error details
    logger.error('Error during CancelRegistration:', {
      email,
      message: error.message,
      stack: error.stack,
    });

    return res.status(500).json({
      status: 'failed',
      message: 'An error occurred while processing your request. Please try again later.',
    });
  }
};
