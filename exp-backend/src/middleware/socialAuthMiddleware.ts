
import express, { Request, Response } from 'express';
import passport from 'passport';
import setTokensCookies from '../utils/generate/setTokenCookies';
import { NEXT_API_BASE_URL } from '../config';

const handleAuthCallback = (req: Request, res: Response) => {
  const { user, accessToken, refreshToken, accessTokenExp, refreshTokenExp } = req.user; 
  setTokensCookies(res, accessToken, refreshToken, accessTokenExp, refreshTokenExp);

  // Successful authentication, redirect home.
  res.redirect(`${NEXT_API_BASE_URL}`);
};

export const createAuthRoutes = (passportStrategy: string) => {
  const router = express.Router();

  router.get(`/auth/${passportStrategy}`,
    passport.authenticate(passportStrategy, { session: false }));

  router.get(`/auth/${passportStrategy}/callback`,
    passport.authenticate(passportStrategy, { session: false, failureRedirect: `${NEXT_API_BASE_URL}/Login` }),
    handleAuthCallback);

  return router;
};

export const createGoogleAuthRoutes = () => createAuthRoutes('google');
export const createFacebookAuthRoutes = () => createAuthRoutes('facebook');
export const createAppleAuthRoutes = () => createAuthRoutes('apple');
