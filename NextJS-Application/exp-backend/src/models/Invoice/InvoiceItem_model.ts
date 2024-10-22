import mongoose, { Schema, Document } from "mongoose";

interface IInvoiceItem extends Document {
  invoiceItemId: string;
  invoiceId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  totalPrice: number;
}

const InvoiceItemSchema: Schema = new Schema({
  invoiceItemId: { type: String, required: true, unique: true },
  invoiceId: { type: Schema.Types.ObjectId, ref: "Invoice", required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

export const InvoiceItem = mongoose.model<IInvoiceItem>(
  "InvoiceItem",
  InvoiceItemSchema
);
