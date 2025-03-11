import User, { IUser } from "./user.model";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Login a user
export const resetUserPassword = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("user not found");

  const hashPassword = await bcrypt.hash(password, 10);
  user.password = hashPassword;
  await user.save();
  return "Password reset successful";
};

// Get booking history
export const getUserBookingHistory = async (userId: string) => {
  const user = await User.findById(userId).populate("trips");
  return user?.trips || [];
};


// Get passenger profile
export const getUserProfile = async (id: string) => {
  const user = await User.findById(id);
  if(!user) throw new Error("User not found")
  return user
};

// Update passenger profile
export const updateUserProfile = async (
  id: string,
  updateData: Partial<IUser>
) => {
  const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedUser) {
    throw new Error("User not found")
  }
  return updatedUser
};

export const getTripsMade = async (id: string) => {
  const user =  await User.findById(id).populate("trips")
  return user?.trips
}