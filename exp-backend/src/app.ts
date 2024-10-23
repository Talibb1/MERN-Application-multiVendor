import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import router from "./routes";
import "./middleware/passport";
import "./controllers/socialAuth";
import { MONGODB_URI, NEXT_API_BASE_URL, connectToDatabase } from "./config";
import { notFoundHandler, globalErrorHandler } from "./middleware/errors";
import {
  createGoogleAuthRoutes,
  createAppleAuthRoutes,
  createFacebookAuthRoutes,
} from "./middleware/socialAuthMiddleware";

const app = express();

// CORS
const allowedOrigins = [NEXT_API_BASE_URL];
app.use(
  cors({
    origin: function (origin, callback) {
      if (origin && allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else if (!origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Body parser and cookie parser should be applied before routes
app.use(express.json()); // Body parser to handle JSON requests
app.use(cookieParser()); // Cookie parser

// Passport middleware for authentication
app.use(passport.initialize());

// Define routes
app.use("/api", router);

// Use the auth routes
app.use(createGoogleAuthRoutes());
app.use(createFacebookAuthRoutes());
app.use(createAppleAuthRoutes());

// Handle undefined routes (404 errors) after routes
app.use(notFoundHandler);

// Global error handler (should be the last middleware)
app.use(globalErrorHandler);

// Connect to MongoDB
connectToDatabase(MONGODB_URI!).catch((error) => {
  console.error("Error connecting to the database:", error);
  process.exit(1);
});

export default app;
