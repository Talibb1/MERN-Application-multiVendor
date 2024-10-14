// config/db.ts
import mongoose from 'mongoose';
import { DB_NAME } from './env';

const connectToDatabase = async (MONGODB_URI: string) => {
  try {
    const MONGODB_OPTIONS = {
      dbName: DB_NAME,

    };
    await mongoose.connect(MONGODB_URI, MONGODB_OPTIONS);
    console.log('Connected to the database successfully');
  } catch (error: any) {
    console.error('Database connection error:', error.message);
    throw new Error('Failed to connect to the database. Please check your connection and try again.');
  }
};

export default connectToDatabase;
