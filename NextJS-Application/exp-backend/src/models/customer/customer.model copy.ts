import mongoose, { Document, Schema } from "mongoose";

// Enum for customer roles
export enum CustomerRole {
  SUPERADMIN = "superadmin",
  ADMIN = "admin",
  VENDOR = "vendor",
  CUSTOMER = "customer",
  SALESMANAGER = "salesmanager",
  ACCOUNTSMANAGER = "accountsmanager",
  DATAENTRYTEAM = "dataentryteam",
  WEBDEVELOPMENTMANAGER = "webdevelopmentmanager",
}

// Interface for the customer document
export interface ICustomer extends Document {
  // customer_group_id: mongoose.Types.ObjectId;
  // store_id: mongoose.Types.ObjectId;
  // language_id: mongoose.Types.ObjectId;
  // address_id: mongoose.Types.ObjectId;
  // devices_id: mongoose.Types.ObjectId;
  // add_to_cart: mongoose.Types.ObjectId;
  countryId: mongoose.Types.ObjectId;
  avatar: string;
  firstname: string;
  lastname: string;
  email: string;
  emailOld: string;
  telephone?: string;
  faxnumber?: string;
  password?: string;
  googleId?: string;
  facebookId?: string;
  appleId?: string;
  authProvider: string[];
  roles: CustomerRole[];
  newsletter: boolean;
  status: boolean;
  isVerified: boolean;
  token: string;
  safe?: boolean;
  code?: string;
  twoFactorEnabled?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema: Schema<ICustomer> = new Schema({
  // customer_group_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "CustomerGroup",
  //   required: true,
  //   index: true, // Index for efficient lookups
  // },
  // store_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Store",
  //   required: true,
  //   index: true, // Index for efficient lookups
  // },
  // language_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Language",
  //   required: true,
  //   index: true, // Index for efficient lookups
  // },
  // address_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Address",
  //   index: true, // Index for efficient lookups
  // },
  // devices_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Device",
  //   index: true, // Index for efficient lookups
  // },
  // add_to_cart: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "AddToCart",
  //   index: true, // Index for faster cart item retrieval
  // },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerCountryData",
    index: true, // Index for faster cart item retrieval
  },
  avatar: {
    type: String,
    trim: true,
    default: "",
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, "First name must be at least 2 characters long"],
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, "Last name must be at least 2 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    index: true, // Index for efficient search and uniqueness
  },
  emailOld: {
    type: String,
    unique: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please provide a valid old email address"],
  },
  telephone: {
    type: String,
    sparse: true,
    match: [/^[0-9]{10,15}$/, "Telephone number must be between 10 to 15 digits"],
  },
  faxnumber: {
    type: String,
    sparse: true,
    match: [/^[0-9]{10,15}$/, "Fax number must be between 10 to 15 digits"],
  },
  password: {
    type: String,
    minlength: [8, "Password must be at least 8 characters long"],
    trim: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  facebookId: {
    type: String,
    unique: true,
    sparse: true,
  },
  appleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  authProvider: {
    type: [String],
    required: true,
    enum: ["LOCAL", "GOOGLE", "FACEBOOK", "APPLE"], // Ensure only valid auth providers
  },
  roles: {
    type: [String],
    enum: Object.values(CustomerRole),
    default: [CustomerRole.CUSTOMER], // Default to 'CUSTOMER' role
  },
  newsletter: {
    type: Boolean,
    default: false,
    sparse: true,
  },
  status: {
    type: Boolean,
    default: false,
    index: true, // For faster filtering of active/inactive users
  },
  isVerified: {
    type: Boolean,
    default: false,
    index: true, // Useful to quickly filter verified users
  },
  token: {
    type: String,
    trim: true,
  },
  safe: {
    type: Boolean,
    default: false,
    sparse: true,
  },
  code: {
    type: String,
    trim: true,
    sparse: true,
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index the email field for unique lookups
CustomerSchema.index({ email: 1 }, { unique: true });
// Create and export the Customer model 
export const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);

