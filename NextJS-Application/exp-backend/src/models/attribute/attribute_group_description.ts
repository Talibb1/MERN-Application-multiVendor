import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AttributeGroupNameSchema = new Schema({
  attribute_group_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  language_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: [true, "Group name is required"],
    trim: true,
    minlength: [1, "Group name must be at least 1 character long"],
    maxlength: [100, "Group name must be less than 100 characters"],
  },
});

const AttributeGroupName = mongoose.model(
  "AttributeGroupName",
  AttributeGroupNameSchema
);

export default AttributeGroupName;
