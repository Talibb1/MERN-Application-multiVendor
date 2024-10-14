import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
  VerifiedCallback,
} from "passport-jwt";
import prisma from "../prisma/prismaClient";
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
  id: number;
}
passport.use(
  new JwtStrategy(
    opts,
    async (jwt_payload: JwtPayload, done: VerifiedCallback) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: jwt_payload.id,
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        });
        if (user) {
          return done(null, user);
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