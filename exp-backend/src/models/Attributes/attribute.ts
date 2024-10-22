import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AttributeSchema = new Schema({
  attribute_id: {
    type: Number,
    required: [true, 'Attribute ID is required'],
    unique: true, // Ensure each attribute_id is unique
  },
  attribute_group_id: {
    type: Number,
    required: [true, 'Attribute Group ID is required'], 
  },
  sort_order: {
    type: Number,
    default: 0, // Default sort order
    min: [0, 'Sort order cannot be less than 0'], 
  },
});

const Attribute = mongoose.model('Attribute', AttributeSchema);

export default Attribute;
