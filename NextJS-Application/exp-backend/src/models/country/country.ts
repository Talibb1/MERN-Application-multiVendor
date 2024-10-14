import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CountrySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Country name is required'],
    trim: true,
    minlength: [2, 'Country name must be at least 2 characters long'],
    maxlength: [100, 'Country name must be less than 100 characters'],
  },
  iso_code_2: {
    type: String,
    required: [true, 'ISO Code 2 is required'],
    trim: true,
    uppercase: true,
    minlength: [2, 'ISO Code 2 must be exactly 2 characters'],
    maxlength: [2, 'ISO Code 2 must be exactly 2 characters'],
    match: [/^[A-Z]{2}$/, 'ISO Code 2 must be two uppercase letters'], // Validate it to be 2 uppercase letters
  },
  iso_code_3: {
    type: String,
    required: [true, 'ISO Code 3 is required'],
    trim: true,
    uppercase: true,
    minlength: [3, 'ISO Code 3 must be exactly 3 characters'],
    maxlength: [3, 'ISO Code 3 must be exactly 3 characters'],
    match: [/^[A-Z]{3}$/, 'ISO Code 3 must be three uppercase letters'], // Validate it to be 3 uppercase letters
  },
  address_format: {
    type: String,
    trim: true,
    default: '', // Some countries may not have a specific address format
  },
  postcode_required: {
    type: Boolean,
    default: false, // If true, postcodes will be required for addresses in this country
  },
  status: {
    type: Boolean,
    default: true, // Country status (active/inactive)
  },
});

const Country = mongoose.model('Country', CountrySchema);

export default Country;
