import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import router from "./routes/userRoutes";
import './middleware/passport';
import './controllers/oAuth/google-strategy';
import { MONGODB_URI, NEXT_API_BASE_URL, connectToDatabase } from "./config";
import { notFoundHandler, globalErrorHandler } from "./middleware/errors";
import { createGoogleAuthRoutes, createAppleAuthRoutes, createFacebookAuthRoutes } from "./middleware/socialAuthMiddleware";

const app = express();

// CORS configuration
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

// Middleware setup
app.use(express.json());
// Cookie parser
app.use(cookieParser());
// Passport setup
app.use(passport.initialize());
// Handle undefined routes (404 errors)
app.use(notFoundHandler);
// Global error handler
app.use(globalErrorHandler);

// Connect to MongoDB
connectToDatabase(MONGODB_URI!).catch((error) => {
  console.error("Error connecting to the database:", error);
  process.exit(1);
});

// Routes setup
app.use("/api", router);

// Use the auth routes
app.use(createGoogleAuthRoutes());
app.use(createFacebookAuthRoutes());
app.use(createAppleAuthRoutes());

export default app;
