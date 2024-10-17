import mongoose, { Document, Schema } from "mongoose";

interface IAddress extends Document {
  customer_id: mongoose.Types.ObjectId;  // Reference to the customer
  firstname: string;
  lastname: string;
  company?: string;                      // Optional field
  address_1: string;
  address_2?: string;                    // Optional field
  city: string;
  custom_field?: Record<string, any>;    // Optional, can store any custom fields
  postcode: string;
  country_id: mongoose.Types.ObjectId;   // Reference to a country
  zone_id: mongoose.Types.ObjectId;      // Reference to a zone (e.g. state/province)
}

// Address Schema
const AddressSchema: Schema<IAddress> = new Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  company: {
    type: String,
    trim: true,
  },
  address_1: {
    type: String,
    required: [true, "Address line 1 is required"],
    trim: true,
  },
  address_2: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true,
  },
  custom_field: {
    type: Object,
    default: {},
  },
  postcode: {
    type: String,
    required: [true, "Postcode is required"],
    trim: true,
  },
  country_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",                     // Assuming you have a Country model
    required: true,
  },
  zone_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Zone",                        // Assuming you have a Zone model
    required: true,
  },
});

// Create Address model
const Address = mongoose.model<IAddress>("Address", AddressSchema);

export default Address;
