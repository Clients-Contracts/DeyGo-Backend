import { Request, Response } from 'express';
import * as PassengerService from './passenger.service';
import { IPassenger } from 'types';

// Register a new passenger
export const register = async (req: Request, res: Response) => {
  try {
    const passengerData: IPassenger = req.body;
    const newPassenger = await PassengerService.registerPassenger(passengerData);
    res.status(201).json(newPassenger);
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

// Login a passenger
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await PassengerService.loginPassenger(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Login failed', error });
  }
}; 

// Login a passenger
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    await PassengerService.resetPassengerPassword(email, password);
    res.status(200).json("Password reset successful");
  } catch (error) {
    res.status(401).json({ message: 'Login failed', error });
  }
}; 
// Get passenger profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const profile = await PassengerService.getPassengerProfile(req.params.id);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get profile', error });
  }
};

// Update passenger profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const updateData = req.body;
    const updatedProfile = await PassengerService.updatePassengerProfile(req.params.id, updateData);
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: 'Profile update failed', error });
  }
};


//Get passenger booking history
export const getBookingHistory = async (req: Request, res: Response) => {
  try {
    const passengerId = req.params.id
    const bookingHistory = await PassengerService.getBookingHistory(passengerId);
    res.status(200).json(bookingHistory)
  } catch (error) {
    res.status(500).json({ message: 'Couldn\'t fetch booking history', error });
  }
}