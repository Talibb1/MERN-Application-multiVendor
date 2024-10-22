import mongoose from 'mongoose';
import { DB_NAME } from './env';
import logger from '../logs/logger';

export const connectToDatabase = async (MONGODB_URI: string) => {
  try {
    const MONGODB_OPTIONS = {
      dbName: DB_NAME,
    };
    await mongoose.connect(MONGODB_URI, MONGODB_OPTIONS);
    console.log('Connected to the database successfully');
  } catch (error: any) {
    logger.error({
      message: 'Database connection error',
      stack: error.stack, 
    });
    console.error('Database connection error:', error.message);
    throw new Error('Failed to connect to the database. Please check your connection and try again.');
  }
};
