import { Schema, model, Document } from 'mongoose';

// CategoryDescription schema interface
export interface CategoryDescriptionDocument extends Document {
  categoryId: Schema.Types.ObjectId; // Reference to the category
  description?: string; // Description of the category
  meta_title?: string; // Meta title for SEO
  meta_description?: string; // Meta description for SEO
  meta_keyword?: string[]; // Meta keywords for SEO
  image?: string; // URL for category image
  views?: number; // Number of views for the category
  sales?: number; // Total sales for the category
  activeProductsCount?: number; // Count of active products in the category
  displayOrder?: number; // Display order for sorting categories
  createdAt: Date;
  updatedAt: Date;
}

// CategoryDescription schema definition
const CategoryDescriptionSchema = new Schema<CategoryDescriptionDocument>({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category', 
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  meta_title: {
    type: String,
    required: false,
  },
  meta_description: {
    type: String,
    required: false,
  },
  meta_keyword: {
    type: [String],
    required: false,
  },
  image: {
    type: String,
    required: false,
    default: "",
  },
  views: {
    type: Number,
    default: 0,
  },
  sales: {
    type: Number,
    default: 0,
  },
  activeProductsCount: {
    type: Number,
    default: 0,
  },
  displayOrder: {
    type: Number,
    default: 0,
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

// Create and export CategoryDescription model
export const CategoryDescription = model<CategoryDescriptionDocument>('CategoryDescription', CategoryDescriptionSchema);

