import { IDriver, IVehicle } from "../types";
import Driver from "./driver.model";
import Vehicle from "../vehicle/vehicle.model";
import Trip from "../trip/trip.model";
import Payment from "../payment/payment.model";
import Notification from "../notiication/notification.model";
import * as bcrypt from "bcrypt"
import { generateToken } from "utils/helpers";


// Register a new driver
export const registerDriver = async (data: IDriver) => {
  const existingDriver = await Driver.findOne({ email: data.email });
  if (existingDriver) throw new Error("Driver already exists");

  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;

  const driver = new Driver(data);
  await driver.save();

  const token = generateToken(driver._id as string);
  return { driver, token };
};

// Login driver
export const loginDriver = async (data: {
  email: string;
  password: string;
}) => {
  const driver = await Driver.findOne({ email: data.email });
  if (!driver) throw new Error("Driver not found");

  const isMatch = await bcrypt.compare(data.password, driver.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(driver._id as string);
  return token;
};

// Get driver profile by ID
export const getDriverProfile = async (driverId: string) => {
  const driver = await Driver.findById(driverId).select("-password");
  if (!driver) throw new Error("Driver not found");
  return driver;
};

// Update driver profile
export const updateDriverProfile = async (
  driverId: string,
  data: Partial<IDriver>
) => {
  const driver = await Driver.findByIdAndUpdate(driverId, data, {
    new: true,
  }).select("-password");
  if (!driver) throw new Error("Driver not found");
  return driver;
};

// Get payment history for driver
export const getDriverPaymentHistory = async (driverId: string) => {
  const payments = await Payment.find({ driver: driverId }).sort({
    transactionDate: -1,
  });
  return payments;
};

// Get vehicle details by driver ID
export const getDriverVehicleDetails = async (driverId: string) => {
  const vehicle = await Vehicle.findOne({ driver: driverId });
  if (!vehicle) throw new Error("Vehicle not found");
  return vehicle;
};

// Update vehicle details
export const updateDriverVehicleDetails = async (
  driverId: string,
  data: Partial<IVehicle>
) => {
  const vehicle = await Vehicle.findOneAndUpdate({ driver: driverId }, data, {
    new: true,
  });
  if (!vehicle) throw new Error("Vehicle not found");
  return vehicle;
};

// Get current active trip for driver
export const getCurrentTrip = async (driverId: string) => {
  const trip = await Trip.findOne({
    driver: driverId,
    status: "active",
  }).populate("users");
  if (!trip) throw new Error("No active trip found");
  return trip;
};

// Get trip history
export const getTripHistory = async (driverId: string) => {
  const trips = await Trip.find({
    driver: driverId,
    status: "completed",
  }).populate("users");
  return trips;
};

// Accept a trip request
export const acceptTrip = async (tripId: string, driverId: string) => {
  const trip = await Trip.findOneAndUpdate(
    { _id: tripId, status: "pending" },
    { status: "active", driver: driverId },
    { new: true }
  ).populate("users");

  if (!trip) throw new Error("Trip not found or already accepted");
  return trip;
};

// Complete a trip
export const completeTrip = async (tripId: string, driverId: string) => {
  const trip = await Trip.findOneAndUpdate(
    { _id: tripId, driver: driverId, status: "active" },
    { status: "completed" },
    { new: true }
  ).populate("users");

  if (!trip) throw new Error("Trip not found or already completed");
  return trip;
};

// Get notifications for driver
export const getNotifications = async (driverId: string) => {
  const notifications = await Notification.find({ receiver: driverId }).sort({
    createdAt: -1,
  });
  return notifications;
};
