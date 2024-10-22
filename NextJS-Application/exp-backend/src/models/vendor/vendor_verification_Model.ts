import mongoose from "mongoose";

const vendorVerificationSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },
  verifiedAt: {
    type: Date
  },
  verificationDocuments: {
    type: [String]
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  comments: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const VendorVerification = mongoose.model("VendorVerification", vendorVerificationSchema);
