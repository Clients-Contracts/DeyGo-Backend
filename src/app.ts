import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import "./config/passport";

dotenv.config();

// Import Routes
import authRoutes from "./auth/auth.routes";
import passengerRoutes from "./passenger/passenger.routes";
import tripRoutes from "./trip/trip.routes";
import adminRoutes from "./admin/admin.routes";
import driverRoutes from "./driver/driver.routes";
import notificationRoutes from "./notiication/notification.routes";
import paymentRoutes from "./payment/payment.routes";
import userRoutes from "./user/user.routes";
import vehicleRoutes from "./vehicle/vehicle.routes"
import User from "user/user.model";
import { Strategy } from "passport-google-oauth20";
const app: Application = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)
app.use("/api/vehicles", vehicleRoutes)
app.use("/api/passengers", passengerRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/payment", paymentRoutes);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Configure Google Strategy
passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
      scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        let user = await User.findOne({ email: profile.emails?.[0].value });
        
        if (!user) {
          // Create new user
          user = new User({
            googleId: profile.id,
            email: profile.emails?.[0].value,
            name: profile.displayName,
            picture: profile.photos?.[0].value,
            role: 'admin' // Default role for Google users
          });
          await user.save();
        } else {
          // Update existing user
          user.providerId = profile.id;
          await user.save();
        }
        
        // Check if user is an admin
        // if (user.role !== 'admin' && user.role !== 'superadmin') {
        //   return done(null, false, { message: 'Not authorized as admin' });
        // }
        
        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
// Database Connection
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

export default app;
