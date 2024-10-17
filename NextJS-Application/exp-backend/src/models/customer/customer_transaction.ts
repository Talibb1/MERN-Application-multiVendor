import mongoose, { Document, Schema, model } from 'mongoose';

// Enum for Transaction Status
enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

// Enum for Transaction Types
enum TransactionType {
  PAYMENT = 'payment',
  REFUND = 'refund'
}

// Interface for the Customer Transaction
export interface ICustomerTransaction extends Document {
  customerId: mongoose.Types.ObjectId;  // Reference to the customer
  storeId: mongoose.Types.ObjectId;  // Reference to the store/vendor
  orderId: mongoose.Types.ObjectId;  // Reference to the order
  transactionType: TransactionType;  // Payment or Refund
  amount: number;  // Transaction amount
  currency: string;  // Currency of the transaction
  paymentMethod: string;  // e.g., Credit Card, PayPal, etc.
  transactionStatus: TransactionStatus;  // Status of the transaction
  transactionId: string;  // External transaction ID from payment gateway
  description?: string;  // Optional description or note for the transaction
  createdAt: Date;  // When the transaction was created
  updatedAt: Date;  // When the transaction was last updated
  metadata?: object;  // Any additional data related to the transaction (discounts, taxes, etc.)
}

// Customer Transaction Schema Definition
const customerTransactionSchema = new Schema<ICustomerTransaction>({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  storeId: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  transactionType: {
    type: String,
    enum: Object.values(TransactionType),
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: 'USD'
  },
  paymentMethod: {
    type: String,
    required: true
  },
  transactionStatus: {
    type: String,
    enum: Object.values(TransactionStatus),
    required: true,
    default: TransactionStatus.PENDING
  },
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  metadata: {
    type: Object
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update the `updatedAt` field on each save
customerTransactionSchema.pre<ICustomerTransaction>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Creating the CustomerTransaction model
export const CustomerTransaction = model<ICustomerTransaction>('CustomerTransaction', customerTransactionSchema);
