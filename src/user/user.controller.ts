import { Request, Response } from "express";
import * as userService from "./user.services";


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

    const updatedProfile = await userService.updateUserProfile(
      req.params.id,
      req.body
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