import { Schema, model, Document } from 'mongoose';

// Geo Zone schema interface
interface GeoZoneDocument extends Document {
  name: string; // Name of the geo zone
  description: string; // Description of the geo zone
  createdAt: Date; // Date when the record was created
  updatedAt: Date; // Date when the record was last updated
}

// Geo Zone schema definition
const GeoZoneSchema = new Schema<GeoZoneDocument>({
  name: {
    type: String,
    required: true, // Name is required
    trim: true, // Remove whitespace from both ends
  },
  description: {
    type: String,
    required: true, // Description is required
    trim: true, // Remove whitespace from both ends
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default value for createdAt
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Default value for updatedAt
  },
});

// Middleware to update the updatedAt field before saving
GeoZoneSchema.pre<GeoZoneDocument>('save', function (next) {
  this.updatedAt = new Date(); // Update updatedAt to the current date
  next(); // Continue with saving
});

// Create and export Geo Zone model
const GeoZone = model<GeoZoneDocument>('GeoZone', GeoZoneSchema);
export default GeoZone;
