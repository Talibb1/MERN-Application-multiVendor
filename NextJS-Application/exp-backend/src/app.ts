import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import router from './routes/userRoutes';
import { createGoogleAuthRoutes } from './routes/socialAuthRoutes';
// import './middleware/passport';
// import './controllers/oAuth/google-strategy';
import { MONGODB_URI } from './config/env';
import connectToDatabase from './config/db';

const app = express();

// CORS configuration
const allowedOrigins = ['http://localhost:3000'];
app.use(
  cors({
    origin: function (origin, callback) {
      if (origin && allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else if (!origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Connect to MongoDB
connectToDatabase(MONGODB_URI!).catch((error) => {
  console.error('Error connecting to the database:', error);
  process.exit(1); // Exit the process if the DB connection fails
});

// Routes setup
app.use('/api', router);

// Authentication Routes (Google)
app.use(createGoogleAuthRoutes());

export default app;
