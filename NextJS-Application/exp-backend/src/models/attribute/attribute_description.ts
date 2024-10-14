import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AttributeNameSchema = new Schema({
  attribute_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  language_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Attribute name is required'],
    trim: true,
    minlength: [1, 'Attribute name must be at least 1 character long'],
    maxlength: [100, 'Attribute name must be less than 100 characters'],
  },
});

const AttributeName = mongoose.model('AttributeName', AttributeNameSchema);

export default AttributeName;
