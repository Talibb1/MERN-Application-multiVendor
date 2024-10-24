import mongoose, { Document, Schema } from "mongoose";

// Enum for activity types
enum ActivityType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  VIEW_PRODUCT = "VIEW_PRODUCT",
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  PURCHASE = "PURCHASE",
  UPDATE_PROFILE = "UPDATE_PROFILE",
  VERIFY_EMAIL = "VERIFY_EMAIL",
  REQUEST_OTP = "REQUEST_OTP",
  // Add more as needed
}

// Interface for CustomerActivity
interface ICustomerActivity extends Document {
  customerId: mongoose.Types.ObjectId; // Reference to the customer
  activityType: ActivityType; // Type of activity
  activityData: Record<string, any>; // Additional data related to the activity
  createdAt: Date; // Timestamp of the activity
}

// Schema for CustomerActivity
const CustomerActivitySchema = new Schema<ICustomerActivity>({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customer", // Reference to the Customer model
  },
  activityType: {
    type: String,
    enum: Object.values(ActivityType),
    required: true,
  },
  activityData: {
    type: Schema.Types.Mixed, // Flexible schema for additional data
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Create the CustomerActivity model
const CustomerActivity = mongoose.model<ICustomerActivity>(
  "CustomerActivity", 
  CustomerActivitySchema
);

export { CustomerActivity, ICustomerActivity, ActivityType };
