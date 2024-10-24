import { Schema, model, Document } from 'mongoose';

// Subscription schema interface
export interface ProductSubscriptionDocument extends Document {
  name: string; // Name of the subscription plan
  price: number; // Price of the subscription
  frequency: string; // Frequency of billing (e.g., 'Monthly', 'Yearly')
  duration: number; // Duration for the subscription
  cycle: number; // Number of billing cycles
  trial_status: boolean; // Is there a trial period?
  trial_price?: number; // Price during the trial period
  trial_frequency?: string; // Frequency of trial billing
  trial_duration?: number; // Duration of the trial period
  trial_cycle?: number; // Number of trial cycles
  status: string; // Status of the subscription (e.g., 'Active', 'Inactive')
  sort_order: number; // Sort order for display
}

// Subscription schema definition
const SubscriptionSchema = new Schema<ProductSubscriptionDocument>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
    enum: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
  },
  duration: {
    type: Number,
    required: true,
  },
  cycle: {
    type: Number,
    required: true,
  },
  trial_status: {
    type: Boolean,
    default: false,
  },
  trial_price: {
    type: Number,
    required: false,
  },
  trial_frequency: {
    type: String,
    required: false,
  },
  trial_duration: {
    type: Number,
    required: false,
  },
  trial_cycle: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Inactive', 'Cancelled'],
  },
  sort_order: {
    type: Number,
    default: 0,
  },
});

// Create and export Subscription model
export const Subscription = model<ProductSubscriptionDocument>('ProductSubscription', SubscriptionSchema);

