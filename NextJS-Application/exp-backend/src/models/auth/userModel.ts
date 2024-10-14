import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';

export interface IUser extends Document {
  user_group_id: string;
  user_id: string;
  username: string;
  password: string;
  salt: string;
  firstname: string;
  lastname: string;
  email: string;
  image?: string;
  code: string;
  ip: string;
  status: boolean;
  date_added: Date;
}

const userSchema: Schema = new Schema({
  user_group_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
    unique: true, // Ensure user_id is unique
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensure the username is unique
    minlength: [4, 'Username must be at least 4 characters long'],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  salt: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
    trim: true, // Removes whitespace
  },
  lastname: {
    type: String,
    required: true,
    trim: true, // Removes whitespace
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure the email is unique
    validate: {
      validator: validator.isEmail,
      message: 'Please enter a valid email',
    },
  },
  image: {
    type: String, // Optional field for the user's image URL
    validate: {
      validator: function (v: string) {
        return validator.isURL(v); // Ensure the image is a valid URL
      },
      message: 'Invalid image URL',
    },
  },
  code: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
    validate: {
      validator: validator.isIP, // Validates IP address format
      message: 'Invalid IP address',
    },
  },
  status: {
    type: Boolean,
    default: true, // Set default status to active (true)
  },
  date_added: {
    type: Date,
    default: Date.now, // Automatically set the date when the record is created
  },
});

// Pre-save hook to handle additional logic before saving
userSchema.pre<IUser>('save', function (next) {
  // Example: Hash password here if needed
  next();
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
