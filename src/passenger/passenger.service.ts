import jwt from 'jsonwebtoken';
import Passenger from './passenger.model';
import * as bcrypt from "bcrypt"
import { IPassenger } from 'types';

// Register a new passenger
export const registerPassenger = async (passengerData: IPassenger) => {
  const hashedPassword = await bcrypt.hash(passengerData.password, 10);
  const newPassenger = new Passenger({ ...passengerData, password: hashedPassword });
  return await newPassenger.save();
};

// Login a passenger
export const loginPassenger = async (email: string, password: string) => {
  const passenger = await Passenger.findOne({ email });
  if (!passenger) throw new Error('Passenger not found');

  const isMatch = await bcrypt.compare(password, passenger.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: passenger._id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1d',
  });

  return token;
};

// Login a passenger
export const resetPassengerPassword = async (email: string, password: string) => {
  const passenger = await Passenger.findOne({ email });
  if (!passenger) throw new Error('Passenger not found');

  const hashPassword = await bcrypt.hash(password, 10);
  passenger.password = hashPassword
  await passenger.save();
  return "Password reset successful";
};

// Get passenger profile
export const getPassengerProfile = async (id: string) => {
  return await Passenger.findById(id);
};

// Update passenger profile
export const updatePassengerProfile = async (id: string, updateData: Partial<IPassenger>) => {
  return await Passenger.findByIdAndUpdate(id, updateData, { new: true });
};

// Get booking history
export const getBookingHistory = async (passengerId: string) => {
  const passenger = await Passenger.findById(passengerId).populate('trips');
  return passenger?.trips || [];
};
