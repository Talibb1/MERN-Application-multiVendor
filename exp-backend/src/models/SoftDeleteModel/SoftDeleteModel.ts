import mongoose, { Schema, Document } from "mongoose";

interface BaseDocument extends Document {
  vendorId: mongoose.Types.ObjectId; // ID of the vendor
  isDeleted: boolean; // Indicates if the item is soft deleted
  deletedAt?: Date; // Timestamp of when the item was deleted
  createdAt: Date; // Timestamp of when the item was created
  updatedAt: Date; // Timestamp of last update
}

const BaseSchema = new Schema<BaseDocument>(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, // Make vendorId mandatory
      ref: "Vendor", // Reference to the Vendor model
    },
    isDeleted: {
      type: Boolean,
      default: false, // False means item is active, true means soft-deleted
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export { BaseDocument, BaseSchema };
