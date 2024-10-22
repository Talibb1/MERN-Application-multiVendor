import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Otp } from "../../models/OtpVerification";

// Function to generate random OTP
export const generateOtp = (): string => Math.floor(1000 + Math.random() * 9000).toString();

// Function to hash OTP with salt and pepper
export const hashOtp = async (otp: string, saltRounds: number, pepper: string): Promise<string> => {
  return await bcrypt.hash(otp + pepper, saltRounds);
};

// Save OTP and Token in the database with expiry dates
export const saveOtpToDatabase = async (
  OtpModel: typeof Otp,
  userId: mongoose.Types.ObjectId,
  userType: "Customer" | "Seller",
  hashedOtp: string,
  hashedToken: string
): Promise<void> => {
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes
  const tokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // Token expires in 10 minutes

  await OtpModel.updateOne(
    { userId, userType },
    {
      otp: hashedOtp,
      otpExpiry,
      token: hashedToken,
      tokenExpiry,
    },
    { upsert: true }
  );
};
