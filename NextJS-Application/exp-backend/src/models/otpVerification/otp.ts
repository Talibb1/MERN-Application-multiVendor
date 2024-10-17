import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  CustomerId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "Customer", // Dynamic reference to either Customer or Seller
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "Seller", // Dynamic reference to either Customer or Seller
  },
  userType: {
    type: String,
    required: true,
    enum: ["Customer", "Seller"], // Enum to differentiate between user types
  },
  otp: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  otpExpiry: {
    type: Date,
    required: true,
  },
  tokenExpiry: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure the OTP and Token documents are automatically deleted after they expire
otpSchema.index({ otpExpiry: 1 }, { expireAfterSeconds: 0 });
otpSchema.index({ tokenExpiry: 1 }, { expireAfterSeconds: 0 });

// Create the OTP model
const UserOtp = mongoose.model("OtpVerifaction", otpSchema);

export default UserOtp;
