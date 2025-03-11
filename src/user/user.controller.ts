import { Request, Response } from "express";
import { IUser } from "./user.model";
import * as userService from "./user.services";

// Register a new passenger
export const register = async (req: Request, res: Response) => {
  try {
    const passengerData: IUser = req.body;
    const newPassenger = await userService.userRegisteration(passengerData);
    res.status(201).json(newPassenger);
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

// Login a passenger
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("afa", email, password);

    const token = await userService.userLogin(email, password);
    console.log(token);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: "Login failed", error });
  }
};

// Login a passenger
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    await userService.resetUserPassword(email, password);
    res.status(200).json("Password reset successful");
  } catch (error) {
    res.status(401).json({ message: "Login failed", error });
  }
};

// Get passenger profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const profile = await userService.getUserProfile(req.params.id);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Failed to get profile", error });
  }
};

// Update passenger profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const {updateData} = req.body;
    const {userId} = req.params;

    const updatedProfile = await userService.updateUserProfile(
      userId,
      updateData
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: "Profile update failed", error });
  }
};

export const fetchTrips = async (req: Request, res: Response) => {
  try {
    const {userId} = req.params;
    const fetchedTrips = await userService.getTripsMade(userId)
    return fetchedTrips
  } catch (error) {
    res.status(500).json({message: "Unable to fetch trips"})
  }
}