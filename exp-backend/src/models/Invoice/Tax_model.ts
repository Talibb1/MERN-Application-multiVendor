import mongoose, { Schema, Document } from "mongoose";

interface ITax extends Document {
  taxId: string;
  country: string;
  rate: number;
  appliedOn: "product" | "service" | "shipping";
  createdAt: Date;
}

const TaxSchema: Schema = new Schema({
  taxId: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  rate: { type: Number, required: true },
  appliedOn: { type: String, enum: ["product", "service", "shipping"], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Tax = mongoose.model<ITax>("Tax", TaxSchema);
