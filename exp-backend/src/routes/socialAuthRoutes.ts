import passport from "passport";
import express, { Request, Response, Router } from "express";
import setTokensCookies from '../utils/generate/generateToken';
import { NEXT_API_BASE_URL } from "../config/env";

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

const handleAuthCallback = (req: Request, res: Response): void => {
  const { user, accessToken, refreshToken, accessTokenExp, refreshTokenExp } = req.user as AuthenticatedUser;
  const accessTokenExpMs = accessTokenExp.getTime(); 
  const refreshTokenExpMs = refreshTokenExp.getTime(); 
  setTokensCookies(res, accessToken, refreshToken, accessTokenExpMs, refreshTokenExpMs);
  res.redirect(`${NEXT_API_BASE_URL}`);
};
export const createGoogleAuthRoutes = (): Router => {
  const router = express.Router();
  router.get(`/auth/google`, passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
  }));
  router.get(`/auth/google/callback`,
    passport.authenticate('google', {
      session: false,
      failureRedirect: `${NEXT_API_BASE_URL}/Login`
    }),
    handleAuthCallback
  );

  return router;
};
