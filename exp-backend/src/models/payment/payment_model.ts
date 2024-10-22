import mongoose, { Schema, Document } from "mongoose";

interface IPayment extends Document {
  paymentId: string;
  invoiceId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  vendorId: mongoose.Types.ObjectId;
  amountPaid: number;
  paymentMethod: "Credit Card" | "Bank Transfer" | "PayPal";
  paymentDate: Date;
  paymentStatus: "Success" | "Pending" | "Failed";
}

const PaymentSchema: Schema = new Schema({
  paymentId: { type: String, required: true, unique: true },
  invoiceId: { type: Schema.Types.ObjectId, ref: "Invoice", required: true },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  vendorId: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
  amountPaid: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["Credit Card", "Bank Transfer", "PayPal"], required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ["Success", "Pending", "Failed"], required: true },
});

export const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);
