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
  countryId: mongoose.Types.ObjectId;
  avatar: string;
  firstname: string;
  lastname: string;
  email: string;
  emailOld: string;
  telephone?: string;
  gender?: string;
  birthday?: string;
  faxnumber?: string;
  password?: string;
  googleId?: string;
  facebookId?: string;
  appleId?: string;
  authProvider: string[];
  roles: CustomerRole[];
  newsletter: boolean;
  status: boolean;
  isActive: boolean;
  isVerified: boolean;
  blacklisted: boolean;
  refreshTokens: {
    token: string;
    expiresAt: Date;
  }[];
  safe?: boolean;
  code?: string;
  twoFactorEnabled?: boolean;
  acceptedTerms: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema: Schema<ICustomer> = new Schema({
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerCountryData",
    index: true,
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
    index: true,
  },
  emailOld: {
    type: String,
    unique: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please provide a valid old email address"],
  },
  telephone: {
    type: String,
    required: true,
    sparse: true,
    match: [
      /^[0-9]{10,15}$/,
      "Telephone number must be between 10 to 15 digits",
    ],
  },
  birthday: {
    type: Date,
    sparse: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    sparse: true,
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
    enum: ["LOCAL", "GOOGLE", "FACEBOOK", "APPLE"],
  },
  roles: {
    type: [String],
    enum: Object.values(CustomerRole),
    default: [CustomerRole.CUSTOMER],
  },
  newsletter: {
    type: Boolean,
    sparse: true,
  },
  status: {
    type: Boolean,
    default: false,
    index: true,
  },
  isActive: {
    type: Boolean,
    default: false,
    index: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
    index: true,
  },
  blacklisted: {
    type: Boolean,
    default: false,
    index: true,
  },
  refreshTokens: [
    {
      token: {
        type: String,
      },
      expiresAt: {
        type: Date,
      },
    },
  ],
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
  acceptedTerms: {
    type: Boolean,
    required: true,
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
