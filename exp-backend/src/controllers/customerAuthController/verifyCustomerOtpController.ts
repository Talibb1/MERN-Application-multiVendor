import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";  
import { Customer } from "../../models/Customer";  
import { Otp } from "../../models/OtpVerification";  
import { sendEmailParams } from "../../types/emailTypes/emailTypes";
import { JWT_ACCESS_KEY } from "../../config/env.js";
import { sendEmail } from "../../utils/sentEmailGmail/emailService";  
import { AppError } from "../../middleware/errors";  
import logger from "../../logs/logger";  

export const VerifyCustomerOtp = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, otp, token } = req.body;

    // Validate request parameters
    if (!email || !otp || !token) {
      throw new AppError("Email, OTP, and token are required.", 400);
    }

    // Check if the customer exists
    const existingCustomer = await Customer.findOne({ email });
    if (!existingCustomer) {
      throw new AppError("User not found.", 404);
    }

    // Check if the customer is already verified
    if (existingCustomer.isVerified) {
      throw new AppError("Email is already verified.", 400);
    }

    // Fetch OTP entry from the database
    const otpEntry = await Otp.findOne({ userId: existingCustomer._id });
    if (!otpEntry) {
      throw new AppError("OTP not found, please request a new one.", 404);
    }

    // Verify the JWT token
    let decoded: { email: string }; 
    try {
      decoded = jwt.verify(token, JWT_ACCESS_KEY) as { email: string };
      if (decoded.email !== email) {
        throw new AppError("Invalid token data.", 400);
      }
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        throw new AppError("Token expired, please request a new one.", 400);
      }
      throw new AppError("Invalid token.", 400);
    }

    // Verify the OTP
    const isOtpMatch = await bcrypt.compare(otp, otpEntry.otp);
    if (!isOtpMatch) {
      throw new AppError("Invalid OTP, please try again.", 400);
    }

    // Check OTP expiration
    const currentTime = new Date();
    if (currentTime > otpEntry.otpExpiry) {
      await Otp.deleteOne({ _id: otpEntry._id });
      throw new AppError("OTP expired, please request a new one.", 400);
    }

    // Mark the user as verified
    existingCustomer.isVerified = true;
    await existingCustomer.save();

    // Remove the used OTP from the database
    await Otp.deleteMany({ userId: existingCustomer._id });

    // Send confirmation email
    const emailParams: sendEmailParams = {
      from: "support@example.com",
      to: existingCustomer.email,
      subject: "Email Verified Successfully",
      html: `<p>Congratulations, ${existingCustomer.firstname}! Your email has been verified successfully.</p>`,
    };
    await sendEmail("welcomeTemplate", emailParams);  

    // Return success response
    return res.status(200).json({
      status: "success",
      message: "Email verified successfully.",
    });
  } catch (error: any) {
    // Log the error
    logger.error("Error during email verification:", error);

    return res.status(error.statusCode || 500).json({
      status: "failed",
      message: error.message || "An error occurred while processing your request. Please try again later.",
    });
  }
};


