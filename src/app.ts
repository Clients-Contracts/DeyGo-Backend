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
import userRoutes from "./user/user.routes"
const app: Application = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)
app.use("/api/passengers", passengerRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/payment", paymentRoutes);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

export default app;
