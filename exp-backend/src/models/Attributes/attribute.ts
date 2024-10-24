import { Schema, model, Document } from 'mongoose';

// Interface for the Attribute model
export interface AttributeDocument extends Document {
  name: string;
  type: string;
  options?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Attribute schema definition
const AttributeSchema = new Schema<AttributeDocument>({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['text', 'dropdown', 'checkbox', 'radio', 'textarea', 'file', 'date', 'number', 'email', 'url'],
    required: true,
  },
  options: {
    type: [String],
    required: function () {
      return this.type === 'dropdown' || this.type === 'checkbox' || this.type === 'radio';
    },
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

// Export Attribute model
export const Attribute = model<AttributeDocument>('Attribute', AttributeSchema);
