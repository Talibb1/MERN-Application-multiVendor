import mongoose, { Document, Schema, model } from "mongoose";

// Interface for the Country model
export interface ICountry extends Document {
  name: string; // Country name (e.g., United States)
  isoCode2: string; // 2-character ISO code (e.g., US)
  isoCode3: string; // 3-character ISO code (e.g., USA)
  addressFormat: string; // Custom address format for the country
  postalCodeRequired: boolean; // Whether postal code is required or not
  status: boolean; // Whether the country is active/enabled
  currency: string; // Default currency used in this country
  city: string; // Default city (if applicable)
  ip: string; // Default IP address (if applicable)
  organization: string; // ISP or organization name
  location: string; // Coordinates (latitude,longitude)
  taxRate: number; // Default tax rate applied to transactions
  timeZone: string; // Timezone used in this country
  region: string; // Region (e.g., North America)
  shippingEnabled: boolean; // Whether shipping to/from this country is allowed
  deleted:  boolean; // Whether the country is deleted
  createdAt: Date; // When the country record was created
  updatedAt: Date; // When the country record was last updated
}

// Country Schema Definition
const countrySchema = new Schema<ICountry>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  isoCode2: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 2,
  },
  isoCode3: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 3,
  },
  addressFormat: {
    type: String,
    required: true, // Required for better validation
  },
  postalCodeRequired: {
    type: Boolean,
    default: false, // Default value can be false
  },
  currency: {
    type: String,
    required: true,
    default: "PKR", // Default currency (you can customize this)
  },
  city: {
    type: String,
    default: "Global",
  },
  ip: {
    type: String,
    default: "0.0.0.0",
  },
  location: {
    type: String,
    default: "00.00,00.00", // Default coordinates
  },
  organization: {
    type: String,
    default: "Unknown", // Default value for organization
  },
  taxRate: {
    type: Number,
    default: 0.0, // Default tax rate (you can customize this)
  },
  shippingEnabled: {
    type: Boolean,
    default: true,
  },
  timeZone: {
    type: String,
    default: "UTC", // Default time zone (can be set based on country)
  },
  region: {
    type: String,
    default: "Global", // e.g., Asia, Europe, North America
  },
  deleted: {
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

// Middleware to update `updatedAt` field before each save
countrySchema.pre<ICountry>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Country Model
export const Country = model<ICountry>("CustomerCountryData", countrySchema);
