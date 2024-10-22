import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BannerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Banner name is required'],
    trim: true,
    minlength: [3, 'Banner name must be at least 3 characters long'],
    maxlength: [100, 'Banner name must be less than 100 characters'],
  },
  status: {
    type: Boolean,
    default: true, // By default, the banner will be active
    required: [true, 'Status is required'], // Validation to ensure status is provided
  },
});

const Banner = mongoose.model('Banner', BannerSchema);

export default Banner;
