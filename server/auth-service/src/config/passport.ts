import { assert, Console } from "console";
import dotenv from "dotenv";
import passport from "passport";
import { Profile, Strategy as GoogleStrategy } from "passport-google-oauth20";

import { findOrRegisterUser } from "../utils/userService";

dotenv.config();

// production stuff
// const AUTH_SERVICE_URL: string | undefined = process.env.AUTH_SERVICE_URL;
// if (!AUTH_SERVICE_URL) {
//     throw new Error("Missing AUTH_SERVICE_URL environment variable");
// }

const GATEWAY_SERVICE_PORT: string | undefined =
  process.env.GATEWAY_SERVICE_PORT;
if (!GATEWAY_SERVICE_PORT) {
  throw new Error("Missing GATEWAY_SERVICE_PORT environment variable");
}
if (GATEWAY_SERVICE_PORT != "3000" && GATEWAY_SERVICE_PORT != "4000") {
  throw new Error("Gateway port must be 3000 or 4000");
}

/**
 * Configures Google OAuth strategy using Passport.js.
 *
 * Sets up Passport to use GoogleStrategy for authenticating users via Google
 * OAuth. Upon successful authentication, it finds or registers the user.
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `http://localhost:${GATEWAY_SERVICE_PORT}/auth/google/callback`,
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done,
    ) => {
      console.log(_accessToken);
      console.log(_refreshToken);
      try {
        const user = await findOrRegisterUser(profile);
        return done(null, user);
      } catch (error: any) {
        return done(error, undefined);
      }
    },
  ),
);

export default passport;
