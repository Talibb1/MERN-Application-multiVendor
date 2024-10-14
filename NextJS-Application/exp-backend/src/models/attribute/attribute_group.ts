import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AttributeGroupSchema = new Schema({
  sort_order: {
    type: Number,
    required: [true, 'Sort order is required'],
    min: [0, 'Sort order cannot be less than 0'], // Minimum value is 0
    default: 0, // Default value is 0 if no sort order is provided
  },
});

const AttributeGroup = mongoose.model('AttributeGroup', AttributeGroupSchema);

export default AttributeGroup;
