// app.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import dotenv from "dotenv";
import router from "./routes";
import { createGoogleAuthRoutes } from "./routes/socialAuthRoutes";
import "./middleware/passport";
import "./controllers/oAuth/google-strategy";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";

dotenv.config();

const app = express();

// Define allowed origins for CORS
const allowedOrigins = ["http://localhost:3000"];
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
app.use(cookieParser());
app.use(passport.initialize());

// Route setup
app.use("/api", router);
app.use(createGoogleAuthRoutes());

// Handle undefined routes (404 errors)
app.use(notFoundHandler);

// Global error handler
app.use(globalErrorHandler);

export default app;
