import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { PrismaClient, User } from '@prisma/client';
import generateTokens from '../../utils/generateToken/generateToken';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const createOrUpdateUser = async (
  profile: Profile,
  provider: string,
  done: (err: any, user?: any, info?: any) => void
) => {
  try {
    let user: User | null = await prisma.user.findUnique({
      where: { email: profile._json.email },
    });

    if (!user) {
      // Create a new user if none exists
      user = await prisma.user.create({
        data: {
          firstName: profile._json.given_name ?? '',
          lastName: profile._json.family_name ?? '',
          email: profile._json.email ?? '',
          googleId: profile.id,
          authProviders: [provider as any],
        },
      });
    } else {
      // Update user if it exists
      const currentProviders = user.authProviders as string[];

      // Check if the provider already exists
      if (!currentProviders.includes(provider)) {
        user = await prisma.user.update({
          where: { email: profile._json.email },
          data: {
            googleId: profile.id,
            authProviders: {
              push: provider as any,
            },
          },
        });
      }
    }

    // Generate JWT tokens
    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = await generateTokens(user);
    return done(null, { user, accessToken, refreshToken, accessTokenExp, refreshTokenExp });

  } catch (error) {
    return done(error, false, { message: `Error with ${provider} authentication` });
  }
};

// Configure Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "/auth/google/callback",
},
  (accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user?: any, info?: any) => void) => {
    if (!profile._json.email) {
      return done(null, false, { message: 'No email found in Google profile' });
    }
    createOrUpdateUser(profile, 'GOOGLE', done);
  }
));

// Serialize and deserialize user for session handling
passport.serializeUser((user: any, done) => {
  done(null, user.user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
