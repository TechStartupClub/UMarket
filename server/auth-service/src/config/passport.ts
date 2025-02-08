import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import dotenv from "dotenv";
import { findOrRegisterUser } from "../utils/userService";

dotenv.config();

// Google OAuth strategy configuration
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "/auth/google/callback",
        },
        async (_accessToken, _refreshToken, profile: Profile, done) => {
            try {
                const user = await findOrRegisterUser(profile);
                return done(null, user);
            } catch (error: any) {
                return done(error, undefined);
            }
        }
    )
);

export default passport;