import mongoose, { Schema, Document } from "mongoose";

interface RecycleBinDocument extends Document {
  vendorId: mongoose.Types.ObjectId; // ID of the vendor
  originalData: any; // Store a copy of the original document
  deletedAt: Date; // Timestamp of when the item was deleted
}

const RecycleBinSchema = new Schema<RecycleBinDocument>({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, // Make vendorId mandatory
    ref: "Vendor", // Reference to the Vendor model
  },
  originalData: {
    type: Object,
    required: true, // Store the original data
  },
  deletedAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date
  },
});

export { RecycleBinDocument, RecycleBinSchema };
