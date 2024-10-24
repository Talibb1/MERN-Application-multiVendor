import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, 'Phone number must be 10 digits'],
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'active',
  },
  date_joined: {
    type: Date,
    default: Date.now,
  },
});

const Vendor = mongoose.model('Vendor', VendorSchema);

export default Vendor;