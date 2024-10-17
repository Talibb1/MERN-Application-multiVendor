import mongoose, { Document, Schema } from "mongoose";

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

export interface ICustomer extends Document {
  customer_group_id: mongoose.Types.ObjectId;
  store_id: mongoose.Types.ObjectId;
  language_id: mongoose.Types.ObjectId;
  address_id: mongoose.Types.ObjectId;
  devices_id: mongoose.Types.ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  email_old: string;
  telephone?: string;
  faxnumber?: string;
  password?: string;
  authProvider: string[];
  roles: CustomerRole[];
  cart: any[];
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
  customer_group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerGroup",
    required: true,
  },
  language_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Language",
    required: true,
  },
  address_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  devices_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Device",
    required: true,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
  },
  email_old: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
  },
  telephone: {
    type: String,
    sparse: true,
    match: [
      /^[0-9]{10,15}$/,
      "Telephone number must be between 10 to 15 digits",
    ],
  },
  faxnumber: {
    type: String,
    sparse: true,
    match: [/^[0-9]{10,15}$/, "Fax number must be between 10 to 15 digits"],
  },
  password: {
    type: String,
    sparse: true,
    minlength: [8, "Password must be at least 8 characters long"],
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
  cart: {
    type: [],
    default: [],
    sparse: true,
  },
  newsletter: {
    type: Boolean,
    default: false,
    sparse: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    required: true,
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

const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);

export default Customer;
