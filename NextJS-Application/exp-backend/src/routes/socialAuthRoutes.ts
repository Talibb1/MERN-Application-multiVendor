import passport from "passport";
import express, { Request, Response, Router } from "express";
import setTokensCookies from '../utils/generateToken/setTokenCookies';
import { NEXT_API_BASE_URL } from "../constants";

// Define the authenticated user type
interface AuthenticatedUser {
  user: {
    id: number;
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
    isAuth: boolean;
    isVerified: boolean;
  };
  accessToken: string;
  refreshToken: string;
  accessTokenExp: Date;
  refreshTokenExp: Date;
}

// Handle the callback after Google authentication
// Handle the callback after Google authentication
const handleAuthCallback = (req: Request, res: Response): void => {
  const { user, accessToken, refreshToken, accessTokenExp, refreshTokenExp } = req.user as AuthenticatedUser;

  // Convert Date objects to timestamps (milliseconds since Unix epoch)
  const accessTokenExpMs = accessTokenExp.getTime(); 
  const refreshTokenExpMs = refreshTokenExp.getTime(); 

  // Set cookies with the tokens
  setTokensCookies(res, accessToken, refreshToken, accessTokenExpMs, refreshTokenExpMs, user.id);

  // Successful authentication, redirect home
  res.redirect(`${NEXT_API_BASE_URL}`);
};


// Create routes specifically for Google authentication
export const createGoogleAuthRoutes = (): Router => {
  const router = express.Router();

  // Initiate the Google OAuth flow
  router.get(`/auth/google`, passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
  }));

  // Handle the Google OAuth callback
  router.get(`/auth/google/callback`,
    passport.authenticate('google', {
      session: false,
      failureRedirect: `${NEXT_API_BASE_URL}/Login`
    }),
    handleAuthCallback
  );

  return router;
};
