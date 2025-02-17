import passport from "passport";
import {
  Strategy as GoogleStrategy,
  VerifyCallback as GoogleVerifyCallback,
} from "passport-google-oauth20";
import {
  Strategy as FacebookStrategy,
  Profile as FacebookProfile,
} from "passport-facebook";
import { Strategy as AppleStrategy, Profile, VerifyCallback } from 'passport-apple';
import User, { IUser } from "../models/passenger.model";
import { OAuthProfile } from "../types/oauthProfile";
import dotenv from "dotenv";

dotenv.config();
// Serialize User
passport.serializeUser((user, done) => {
  done(null, (user as IUser)._id);
});

// Deserialize User
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).lean();
    done(null, user as IUser);
  } catch (err) {
    done(err, null);
  }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "/auth/google/callback",
      passReqToCallback: true, // 👈 Add this line
    },
    async (req, _accessToken, _refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ providerId: profile.id });
        if (!user) {
          user = await User.create({
            provider: "google",
            providerId: profile.id,
            name: profile.displayName || "Unknown User",
            email: profile.emails?.[0]?.value || "no-email@example.com",
          });
        }
        done(null, user);
      } catch (error) {
        done(error as Error, undefined);
      }
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails"],
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: FacebookProfile,
      done
    ) => {
      try {
        let user = await User.findOne({ providerId: profile.id });
        if (!user) {
          user = await User.create({
            provider: "facebook",
            providerId: profile.id,
            name: profile.displayName || "Unknown User",
            email: profile.emails?.[0]?.value || "no-email@example.com",
          });
        }
        done(null, user);
      } catch (error) {
        done(error as Error, null);
      }
    }
  )
);

// Apple Strategy
//@ts-ignore
passport.use(new AppleStrategy({
    clientID: process.env.APPLE_CLIENT_ID || '',
    teamID: process.env.APPLE_TEAM_ID || '',
    keyID: process.env.APPLE_KEY_ID || '',
    privateKeyString: process.env.APPLE_PRIVATE_KEY || '',
    callbackURL: '/auth/apple/callback',
    passReqToCallback: true  // Required for using Request in callback
  },
  async (req: Request, _accessToken: string, _refreshToken: string, profile: Profile, done: VerifyCallback) => {
    const typedProfile = profile as unknown as OAuthProfile;

    try {
      let user = await User.findOne({ providerId: typedProfile.id });
      if (!user) {
        user = await User.create({
          provider: 'apple',
          providerId: typedProfile.id,
          name: `${typedProfile.name?.firstName || ''} ${typedProfile.name?.lastName || ''}`,
          email: typedProfile.emails?.[0]?.value || ''
        });
      }
      done(null, user);  // Correct usage with VerifyCallback
    } catch (error) {
      done(error as Error, undefined);  // Use undefined instead of null
    }
  }
));