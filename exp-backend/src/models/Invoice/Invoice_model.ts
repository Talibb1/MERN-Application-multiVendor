import mongoose, { Schema, Document } from "mongoose";

interface IInvoice extends Document {
  invoiceNumber: string;
  orderId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  vendorId: mongoose.Types.ObjectId;
  items: Array<{
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
    totalPrice: number;
  }>;
  totalAmount: number;
  taxAmount: number;
  discount?: number;
  paymentStatus: "Paid" | "Pending" | "Failed";
  paymentMethod: "Credit Card" | "Bank Transfer" | "PayPal";
  createdAt: Date;
  dueDate: Date;
  status: "Unpaid" | "Paid" | "Overdue";
  currency: string;
}

const InvoiceSchema: Schema = new Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  vendorId: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  taxAmount: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  paymentStatus: {
    type: String,
    enum: ["Paid", "Pending", "Failed"],
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Bank Transfer", "PayPal"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["Unpaid", "Paid", "Overdue"], required: true },
  currency: { type: String, default: "USD" },
});

export const Invoice = mongoose.model<IInvoice>("Invoice", InvoiceSchema);
