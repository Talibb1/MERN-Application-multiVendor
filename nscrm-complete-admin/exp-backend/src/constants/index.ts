import dotenv from "dotenv";
dotenv.config();

export const DATABASE_URL: string | undefined = process.env.DATABASE_URL;
export const DB_NAME: string | undefined = process.env.DB_NAME;
export const NEXT_API_BASE_URL: string | undefined = process.env.NEXT_API_BASE_URL;
export const PORT: string | undefined = process.env.PORT;
export const SALT: string | undefined = process.env.SALT;
export const JWT_ACCESS_KEY: string | undefined = process.env.JWT_ACCESS_KEY;
export const JWT_REFRESH_KEY: string | undefined = process.env.JWT_REFRESH_KEY;
export const GOOGLE_CLIENT_ID: string | undefined = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET: string | undefined = process.env.GOOGLE_CLIENT_SECRET;
export const EMAIL_REPLY_TO: string | undefined = process.env.EMAIL_REPLY_TO;
export const EMAIL_FROM: string | undefined = process.env.EMAIL_FROM;
export const EMAIL_PASSWORD: string | undefined = process.env.EMAIL_PASSWORD;
export const EMAIL_USER: string | undefined = process.env.EMAIL_USER;
export const EMAIL_PORT: string | undefined = process.env.EMAIL_PORT;
export const EMAIL_HOST: string | undefined = process.env.EMAIL_HOST;
export const NODE_ENV: string | undefined = process.env.NODE_ENV;
