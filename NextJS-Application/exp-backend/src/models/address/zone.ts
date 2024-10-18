import { Schema, model, Document } from 'mongoose';

// Zone schema interface
interface ZoneDocument extends Document {
  country_id: Schema.Types.ObjectId; 
  name: string; 
  zonecode: string; 
}

// Zone schema definition
const ZoneSchema = new Schema<ZoneDocument>({
  country_id: {
    type: Schema.Types.ObjectId,
    ref: 'Country', 
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  zonecode: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create and export Zone model
export const Zone = model<ZoneDocument>('Zone', ZoneSchema);

