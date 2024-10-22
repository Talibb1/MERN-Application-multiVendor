import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BannerImageSchema = new Schema({
  banner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  language_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [100, 'Title must be less than 100 characters'],
  },
  link: {
    type: String,
    required: false,
    trim: true,
    match: [
      /^https?:\/\/[^\s$.?#].[^\s]*$/, 
      'Invalid URL format. Link must be a valid URL'
    ], // Validation to check if link is a valid URL
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
    trim: true,
    match: [
      /\.(jpg|jpeg|png|gif)$/i, 
      'Invalid image format. Must be JPG, JPEG, PNG, or GIF'
    ], // Validation to check if image is in a valid format
  },
  sort_order: {
    type: Number,
    default: 0, // Default sorting order
    required: [true, 'Sort order is required'],
    min: [0, 'Sort order must be a non-negative number'],
  },
});

const BannerImage = mongoose.model('BannerImage', BannerImageSchema);

export default BannerImage;
