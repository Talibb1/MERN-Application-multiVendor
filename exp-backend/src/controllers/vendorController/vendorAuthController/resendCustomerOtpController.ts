import { Request, Response } from "express";
import { Otp } from "../../../models/OtpVerification"; // Import the OTP model
import { Customer } from "../../../models/Customer"; 
import { generateOtp, hashOtp, saveOtpToDatabase } from "../../../utils/generate/generateOtp"; 
import { sendEmail } from "../../../utils/sentEmailGmail/emailService"; // Function to send OTP email
import { SALT } from "../../../config/env"; // Only using SALT now
import logger from "../../../logs/logger"; // Add logger for better error tracking
import mongoose from "mongoose";

export const ResendCustomerOtp = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({
        status: "failed",
        message: "Email is required.",
      });
    }

    // Find the customer by email
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({
        status: "failed",
        message: "Customer not found.",
      });
    }

    // Check if the customer is already verified
    if (customer.isVerified) {
      return res.status(400).json({
        status: "failed",
        message: "Customer is already verified.",
      });
    }

    // Generate a new OTP
    const otp = generateOtp();
    const token = generateOtp(); // Token is also randomly generated
    const hashedOtp = await hashOtp(otp, Number(SALT)); // Only salt used
    const hashedToken = await hashOtp(token, Number(SALT)); // Same for token

    // Remove any existing OTP for this customer (clean up old records)
    await Otp.deleteMany({ CustomerId: customer._id as mongoose.Types.ObjectId, userType: "Customer" });
    await saveOtpToDatabase(Otp, customer._id as mongoose.Types.ObjectId, "Customer", hashedOtp, hashedToken);

    // Send the new OTP to customer's email
    const customerName = customer.firstname; // Extract customer name
    await sendEmail('otpTemplate', { email, otp, name: customerName });

    return res.status(200).json({
      status: "success",
      message: "A new OTP has been sent to your email.",
    });
  } catch (error) {
    // Log the error with more details
    logger.error("Error during OTP resend:", error);

    // Send an appropriate response to the client
    return res.status(500).json({
      status: "failed",
      message: "An error occurred while processing your request. Please try again later.",
    });
  }
};
