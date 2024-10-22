import { Request, Response } from "express";
import { Otp } from "../../models/otpVerification"; // Import the OTP model
import { Customer } from "../../models/customer"; 
import { generateOtp, hashOtp, saveOtpToDatabase } from "../../utils/generate/generateOtp"; 
import { sendOtpEmail } from "../../utils/sentEmail(Gmail)/sendEmail"; // Function to send OTP email
import { SALT } from "../../config/env"; // Only using SALT now


export const ResendCustomerOtp = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.body;

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
    const hashedOtp = await hashOtp(otp, Number(SALT)); // Only salt used, no pepper
    const hashedToken = await hashOtp(token, Number(SALT)); // Same here

    // Remove any existing OTP for this customer
    await Otp.deleteMany({ userId: customer._id, userType: "Customer" });

    // Save the new OTP and token to the database
    await saveOtpToDatabase(Otp, customer._id, "Customer", hashedOtp, hashedToken);

    // Send the new OTP to customer's email
    await sendOtpEmail(email, otp, customer.firstname);

    return res.status(200).json({
      status: "success",
      message: "A new OTP has been sent to your email.",
    });
  } catch (error) {
    console.error("Error during OTP resend:", error);
    return res.status(500).json({
      status: "failed",
      message: "An error occurred while processing your request.",
    });
  }
};
