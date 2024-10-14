import dotenv from "dotenv";
dotenv.config();

export const MONGODB_URI: string | undefined = process.env.MONGODB_URI;
export const NODE_ENV: string | undefined = process.env.NODE_ENV;
export const DB_NAME: string | undefined = process.env.DB_NAME;
export const NEXT_API_BASE_URL: string | undefined = process.env.NEXT_API_BASE_URL;
export const PORT: string | undefined = process.env.PORT;
export const SALT: string | undefined = process.env.SALT;
export const JWT_ACCESS_KEY: string | undefined = process.env.JWT_ACCESS_KEY;
export const JWT_REFRESH_KEY: string | undefined = process.env.JWT_REFRESH_KEY;
export const GOOGLE_CLIENT_ID: string | undefined = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET: string | undefined = process.env.GOOGLE_CLIENT_SECRET;
export const GITHUB_CLIENT_ID: string | undefined = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET: string | undefined = process.env.GITHUB_CLIENT_SECRET;
