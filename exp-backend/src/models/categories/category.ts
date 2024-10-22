import { Schema, model, Document } from 'mongoose';

// Category schema interface
interface CategoryDocument extends Document {
  name: string; // Name of the category
  parentCategory?: Schema.Types.ObjectId | null; // Reference to parent category (null for top-level categories)
  subcategories?: Schema.Types.ObjectId[]; // Array of subcategories (references)
  level: number; // Depth level of the category (0 for top-level categories)
  products?: Schema.Types.ObjectId[]; // List of products that belong to this category
  vendorId?: Schema.Types.ObjectId; // Vendor reference (optional if categories can be vendor-specific)
  createdAt: Date;
  updatedAt: Date;
}

// Category schema definition
const CategorySchema = new Schema<CategoryDocument>({
  name: {
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
const Category = model<CategoryDocument>('Category', CategorySchema);
export default Category;
