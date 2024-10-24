import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { Otp } from "../../models/OtpVerification";

export const generateOtp = (): string =>
  Math.floor(1000 + Math.random() * 9000).toString();

export const hashOtp = async (
  otp: string,
  saltRounds: number
): Promise<string> => {
  return await bcrypt.hash(otp, saltRounds);
};

export const saveOtpToDatabase = async (
  OtpModel: typeof Otp,
  CustomerId: Types.ObjectId,
  userType: "Customer" | "Seller",
  hashedOtp: string,
  hashedToken: string
): Promise<void> => {
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes
  const tokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // Token expires in 10 minutes

  await OtpModel.updateOne(
    { CustomerId, userType },
    {
      otp: hashedOtp,
      otpExpiry,
      token: hashedToken,
      tokenExpiry,
    },
    { upsert: true }
  );
};
