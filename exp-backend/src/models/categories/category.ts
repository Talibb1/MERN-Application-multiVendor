import { Schema, model, Document } from 'mongoose';

export interface CategoryDocument extends Document {
  categoryName: string;
  parentCategory?: Schema.Types.ObjectId | null;
  subcategories?: Schema.Types.ObjectId[];
  level: number;
  products?: Schema.Types.ObjectId[];
  vendorId?: Schema.Types.ObjectId;
  filters?: string[];
  attributes?: Schema.Types.ObjectId[]; 
  status: string;
  delete?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
const CategorySchema = new Schema<CategoryDocument>({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
  parentCategory: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  },
  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  level: {
    type: Number,
    default: 0,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
    required: false,
  },
  filters: {
    type: [String],
    required: false,
  },
  attributes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Attribute',
    },
  ],
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

// Export Category model
export const Category = model<CategoryDocument>('Category', CategorySchema);
