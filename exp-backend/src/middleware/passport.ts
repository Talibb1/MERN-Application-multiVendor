import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
  VerifiedCallback,
} from "passport-jwt";
import { Customer } from "../models/Customer";
import express from "express";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
const app = express();


const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_KEY as string,
};

interface JwtPayload {
  id: string;
}

passport.use(
  new JwtStrategy(
    opts,
    async (jwt_payload: JwtPayload, done: VerifiedCallback) => {
      try {
        const customer = await Customer.findById(jwt_payload.id).select(
          "id firstname lastname email roles status isVerified"
        );
        if (customer) {
          return done(null, customer);
        } else {
          return done(null, false, { message: "Invalid token" });
        }
      } catch (error) {
        console.error("Error in JwtStrategy:", error);
        return done(error, false);
      }
    }
  )
);

app.use(passport.initialize());
