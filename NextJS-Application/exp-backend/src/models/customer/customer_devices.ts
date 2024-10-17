import mongoose, { Schema, Document } from 'mongoose';

// Device Interface
export interface IDevice extends Document {
  userId: mongoose.Types.ObjectId;  // Reference to the user using this device
  deviceType: string;  // Device type (desktop, mobile, tablet)
  os: string;  // Operating System (Windows, iOS, Android, etc.)
  browser: string;  // Browser used (Chrome, Firefox, Safari, etc.)
  ip: string;  // IP Address of the device
  lastLogin: Date;  // Last login date for this device
}

// Device Schema Definition
const deviceSchema = new Schema<IDevice>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  deviceType: {
    type: String,
    required: true
  },
  os: {
    type: String,
    required: true
  },
  browser: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true,
    trim: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true  // Automatically manage createdAt and updatedAt
});

// Device Model
export const Device = mongoose.model<IDevice>('Device', deviceSchema);
