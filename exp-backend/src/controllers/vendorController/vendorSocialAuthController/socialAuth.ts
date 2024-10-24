import passport from 'passport';
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy, Profile as FacebookProfile } from 'passport-facebook';
import { Strategy as AppleStrategy, Profile as AppleProfile } from 'passport-apple';
import { Customer } from '../../../models/Customer';
import generateTokens from '../../../utils/generate/generateToken';
import dotenv from 'dotenv';
import {
  APPLE_CLIENT_ID,
  APPLE_KEY_ID,
  APPLE_PRIVATE_KEY,
  APPLE_TEAM_ID,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '../../../config';

dotenv.config();

// Function to create or update customer
const createOrUpdateCustomer = async (
  profile: GoogleProfile | FacebookProfile | AppleProfile,
  provider: string,
  done: (err: any, user?: any, info?: any) => void
) => {
  try {
    const email = profile.emails && profile.emails[0].value;
    let customer = await Customer.findOne({ email });

    if (!customer) {
      // Create a new customer if none exists
      customer = await Customer.create({
        firstname: profile.name?.givenName || '',
        lastname: profile.name?.familyName || '',
        email: email || '',
        authProvider: [provider],
        ...(provider === 'GOOGLE' && { googleId: profile.id }),
        ...(provider === 'FACEBOOK' && { facebookId: profile.id }),
        ...(provider === 'APPLE' && { appleId: profile.id }),
      });
    } else {
      // Update customer if it exists
      const currentProviders = customer.authProvider;

      if (!currentProviders.includes(provider)) {
        customer.authProvider.push(provider);
        await customer.save();
      }
    }

    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = await generateTokens(customer);
    return done(null, { user: customer, accessToken, refreshToken, accessTokenExp, refreshTokenExp });
  } catch (error) {
    return done(error, false, { message: `Error with ${provider} authentication` });
  }
};

// Configure Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
      callbackURL: '/auth/google/callback',
    },
    (accessToken: string, refreshToken: string, profile: GoogleProfile, done: (err: any, user?: any, info?: any) => void) => {
      const email = profile.emails && profile.emails[0].value;
      if (!email) {
        return done(null, false, { message: 'No email found in Google profile' });
      }
      createOrUpdateCustomer(profile, 'GOOGLE', done);
    }
  )
);

// Configure Facebook OAuth Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID!,
      clientSecret: FACEBOOK_APP_SECRET!,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos', 'email', 'first_name', 'last_name'],
    },
    (accessToken: string, refreshToken: string, profile: FacebookProfile, done: (err: any, user?: any, info?: any) => void) => {
      const email = profile.emails && profile.emails[0].value;
      if (!email) {
        return done(null, false, { message: 'No email found in Facebook profile' });
      }
      createOrUpdateCustomer(profile, 'FACEBOOK', done);
    }
  )
);

// Configure Apple OAuth Strategy
passport.use(
  new AppleStrategy(
    {
      clientID: APPLE_CLIENT_ID!,
      teamID: APPLE_TEAM_ID!,
      keyID: APPLE_KEY_ID!,
      privateKey: Buffer.from(APPLE_PRIVATE_KEY!, 'utf8'),
      callbackURL: '/auth/apple/callback',
    },
    (accessToken: string, refreshToken: string, idToken: string, profile: AppleProfile, done: (err: any, user?: any, info?: any) => void) => {
      if (!profile.id) {
        return done(null, false, { message: 'No ID found in Apple profile' });
      }
      createOrUpdateCustomer(profile, 'APPLE', done);
    }
  )
);

// Serialize and deserialize customer for session handling
passport.serializeUser((user: any, done) => {
  done(null, user.user._id); // Use `_id` here for MongoDB
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const customer = await Customer.findById(id);
    done(null, customer);
  } catch (error) {
    done(error, null);
  }
});

