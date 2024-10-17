import mongoose, { Document, Schema, model } from 'mongoose';

// Interface for Wishlist Item
interface IWishlistItem {
  productId: mongoose.Types.ObjectId;  
  productName: string; 
  productPrice: number;  
  quantity: number;  
  addedAt: Date; 
}

// Main Interface for Wishlist
export interface IWishlist extends Document {
  customerId: mongoose.Types.ObjectId;  
  storeId: mongoose.Types.ObjectId; 
  items: IWishlistItem[];  
  note?: string;  
  isPublic: boolean;  
  createdAt: Date;  
  updatedAt: Date;  
}

// Wishlist Schema Definition
const wishlistSchema = new Schema<IWishlist>({
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
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      productName: {
        type: String,
        required: true
      },
      productPrice: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      },
      addedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  note: {
    type: String,
    trim: true
  },
  isPublic: {
    type: Boolean,
    default: false
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
wishlistSchema.pre<IWishlist>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Creating the Wishlist Model with TypeScript types
export const Wishlist = model<IWishlist>('Wishlist', wishlistSchema);
