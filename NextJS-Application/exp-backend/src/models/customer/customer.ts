import mongoose from "mongoose";
const Schema = mongoose.Schema;

enum UserRole {
  SUPERADMIN = "superadmin",
  ADMIN = "admin",
  VENDOR = "vendor",
  USER = "user",
  MODERATOR = "moderator",
  SUPPORT_STAFF = "support_staff",
  MARKETING_MANAGER = "marketing_manager",
  INVENTORY_MANAGER = "inventory_manager",
  ANALYTICS_MANAGER = "analytics_manager",
  FINANCE_MANAGER = "finance_manager",
}

const CustomerSchema = new Schema({
  customer_group_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  language_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  address_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  firstname: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    minlength: [2, "First name must be at least 2 characters long"],
  },
  lastname: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    minlength: [2, "Last name must be at least 2 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
  },
  email_old: {
    type: String,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please provide a valid old email address"],
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  appleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  facebookId: {
    type: String,
    unique: true,
    sparse: true,
  },
  authProvider: {
    type: [String],
    enum: ["google", "apple", "facebook", "local"],
    required: true,
  },
  roles: {
    type: [String],
    enum: Object.values(UserRole),
    default: UserRole.USER,
  },
  telephone: {
    type: String,
    sparse: true,
    match: [
      /^[0-9]{10,15}$/,
      "Telephone number must be between 10 to 11 digits",
    ],
  },
  fax: {
    type: String,
    sparse: true,
    trim: true,
    match: [/^[0-9]{10,15}$/, "Fax number must be between 10 to 15 digits"],
  },
  password: {
    type: String,
    sparse: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
  salt: {
    type: String,
    required: true,
  },
  cart: {
    type: Array,
    default: [],
    sparse: true,
  },
  wishlist: {
    type: Array,
    default: [],
    sparse: true,
  },
  newsletter: {
    type: Boolean,
    default: false,
    sparse: true,
  },
  custom_field: {
    type: Object,
    default: {},
    sparse: true,
  },
  ip: {
    type: String,
    required: true,
    trim: true,
    match: [/^(\d{1,3}\.){3}\d{1,3}$/, "Please provide a valid IP address"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  safe: {
    type: Boolean,
    default: false,
    sparse: true,
  },
  token: {
    type: String,
    trim: true,
  },
  code: {
    type: String,
    trim: true,
    sparse: true,
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

CustomerSchema.index({ token: 1 }, { unique: true });

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;
