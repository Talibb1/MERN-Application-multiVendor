import { Schema, model, Document } from 'mongoose';

// AddToCart schema interface
export interface AddToCartDocument extends Document {
  apiId: string; // API ID for the cart item
  customerId?: Schema.Types.ObjectId; // Reference to the customer (optional for guests)
  sessionId: string; // Session ID for tracking guests
  productId: Schema.Types.ObjectId; // Reference to the product being added to the cart
  ProductSubscriptionId?: Schema.Types.ObjectId; // Reference to ProductSubscription orders if applicable
  option?: string; // Additional options for the product
  quantity: number; // Quantity of the product being added
  createdAt: Date; // Date when the product was added to the cart
  updatedAt: Date;
}

// AddToCart schema definition
const AddToCartSchema = new Schema<AddToCartDocument>({
  apiId: {
    type: String,
    required: true,
    trim: true,
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer', // Reference to Customer model (null for guests)
    required: false,
  },
  sessionId: {
    type: String,
    required: true,
    trim: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product', // Reference to Product model
    required: true,
  },
  ProductSubscriptionId: {
    type: Schema.Types.ObjectId,
    ref: 'ProductSubscription', // Reference to ProductSubscription model (if applicable)
    required: false,
  },
  option: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, // Minimum quantity should be 1
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

// Create and export AddToCart model
export const AddToCart = model<AddToCartDocument>('AddToCart', AddToCartSchema);
