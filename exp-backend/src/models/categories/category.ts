import { Schema, model, Document } from 'mongoose';

// Category schema interface
export interface CategoryDocument extends Document {
  categoryName: string; // Name of the category
  parentCategory?: Schema.Types.ObjectId | null; // Reference to parent category (null for top-level categories)
  subcategories?: Schema.Types.ObjectId[]; // Array of subcategories (references)
  level: number; // Depth level of the category (0 for top-level categories)
  products?: Schema.Types.ObjectId[]; // List of products that belong to this category
  vendorId?: Schema.Types.ObjectId; // Vendor reference (optional if categories can be vendor-specific)
  filters?: string[]; // Array for filtering options
  status: string; // Status of category (active, inactive, pending)
  delete?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Category schema definition
const CategorySchema = new Schema<CategoryDocument>({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
  parentCategory: {
    type: Schema.Types.ObjectId,
    ref: 'Category', // Self-referencing field for parent category
    default: null,
  },
  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category', // Self-referencing for subcategories
    },
  ],
  level: {
    type: Number,
    default: 0, // Level 0 is for top-level categories
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product', // Reference to products in the category
    },
  ],
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor', // Vendor reference (if categories are vendor-specific)
    required: false,
  },
  filters: {
    type: [String], // Array for filtering options
    required: false,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'active',
  },
  delete: {
    type: Boolean,
    default: false,
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

// Create and export Category model
export const Category = model<CategoryDocument>('Category', CategorySchema);
