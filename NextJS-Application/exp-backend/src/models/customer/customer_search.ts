import { Schema, model, Document } from 'mongoose';

// Define the search history schema interface
interface SearchHistoryDocument extends Document {
  customerId: Schema.Types.ObjectId; // Reference to the customer
  searchTerm: string; // The search term entered by the customer
  searchFilters: {
    category?: string; // Filter by category
    priceRange?: { min: number; max: number }; // Filter by price range
    vendorId?: Schema.Types.ObjectId; // Filter by vendor
  };
  searchDate: Date; // When the search was made
  deviceInfo: {
    deviceType: string; // Type of device used for the search (e.g., Mobile, Desktop, etc.)
    os: string; // Operating System
    browser: string; // Browser used
    ip: string; // IP address of the user
  };
  resultsCount: number; // How many results were returned
  viewedProducts: [Schema.Types.ObjectId]; // List of product IDs viewed after this search
}

// Create the search history schema
const SearchHistorySchema = new Schema<SearchHistoryDocument>({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  searchTerm: {
    type: String,
    required: true,
    trim: true,
  },
  searchFilters: {
    category: {
      type: String,
      required: false,
    },
    priceRange: {
      min: { type: Number, required: false },
      max: { type: Number, required: false },
    },
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: 'Vendor', // Reference to vendor model (if relevant)
      required: false,
    },
  },
  searchDate: {
    type: Date,
    default: Date.now,
  },
  resultsCount: {
    type: Number,
    default: 0,
  },
  viewedProducts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

// Create and export the SearchHistory model
const SearchHistory = model<SearchHistoryDocument>('SearchHistory', SearchHistorySchema);

export default SearchHistory;
