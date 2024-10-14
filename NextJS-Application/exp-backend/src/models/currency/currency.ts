import mongoose from 'mongoose';

const CurrencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Currency name, e.g., "US Dollar"
    trim: true,
  },
  code: {
    type: String,
    required: true, // Currency code, e.g., "USD"
    uppercase: true,
    trim: true,
  },
  symbol: {
    type: String,
    required: true, // Symbol, e.g., "$"
    trim: true,
  },
  exchange_rate: {
    type: Number,
    required: true,
    min: [0, 'Exchange rate must be a positive value'],
  },
  base: {
    type: Boolean,
    default: false,
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

const Currency = mongoose.model('Currency', CurrencySchema);

export default Currency;
