import dotenv from "dotenv";
dotenv.config();

export const MONGODB_URI: string | undefined = process.env.MONGODB_URI;
export const NODE_ENV: string | undefined = process.env.NODE_ENV;
export const DB_NAME: string | undefined = process.env.DB_NAME;
export const NEXT_API_BASE_URL: string | undefined = process.env.NEXT_API_BASE_URL;
export const PORT: string | undefined = process.env.PORT;
export const SALT: string | undefined = process.env.SALT;
// JWT Configuration
export const JWT_ACCESS_KEY: string | undefined = process.env.JWT_ACCESS_KEY;
export const JWT_REFRESH_KEY: string | undefined = process.env.JWT_REFRESH_KEY
// Google Email Configuration
export const GOOGLE_CLIENT_ID: string | undefined = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET: string | undefined = process.env.GOOGLE_CLIENT_SECRET;
// Facebook Email Configuration
export const FACEBOOK_APP_ID: string | undefined = process.env.FACEBOOK_APP_ID;
export const FACEBOOK_APP_SECRET: string | undefined = process.env.FACEBOOK_APP_SECRET;
// Apple Email Configuration
export const APPLE_KEY_ID: string | undefined = process.env.APPLE_KEY_ID;
export const APPLE_SECRET: string | undefined = process.env.APPLE_SECRET;
// AWS SES Email Configuration
export const REGION: string | undefined = process.env.REGION;
export const ACCESSKEYID: string | undefined = process.env.ACCESSKEYID;
export const SECRETACCESSKEY: string | undefined = process.env.SECRETACCESSKEY;
// Googel Email Configuration
export const EMAIL_HOST: string | undefined = process.env.EMAIL_HOST;
export const EMAIL_PORT: string | undefined = process.env.EMAIL_PORT;
export const EMAIL_PASSWORD: string | undefined = process.env.EMAIL_PASSWORD;
export const EMAIL_FROM: string | undefined = process.env.EMAIL_FROM;
export const EMAIL_REPLY_TO: string | undefined = process.env.EMAIL_REPLY_TO;
export const EMAIL_USER: string | undefined = process.env.EMAIL_USER;