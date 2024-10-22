import { Schema, model, Document } from 'mongoose';

// CategoryDescription schema interface
interface CategoryDescriptionDocument extends Document {
  categoryId: Schema.Types.ObjectId; // Reference to the category
  name: string; // Name of the category
  description?: string; // Description of the category
  meta_title?: string; // Meta title for SEO
  meta_description?: string; // Meta description for SEO
  meta_keyword?: string[]; // Meta keywords for SEO
  createdAt: Date; // Created timestamp
  updatedAt: Date; // Updated timestamp
}

// CategoryDescription schema definition
const CategoryDescriptionSchema = new Schema<CategoryDescriptionDocument>({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category', 
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
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
    type: [String], // Array of strings
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

// Create and export CategoryDescription model
const CategoryDescription = model<CategoryDescriptionDocument>('CategoryDescription', CategoryDescriptionSchema);
export default CategoryDescription;
