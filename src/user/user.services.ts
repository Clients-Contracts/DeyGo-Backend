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

// Login a user
export const userLogin = async (email: string, password: string) => {
  console.log(email, password);
  const user = await User.findOne({ email });
  console.log(1);

  if (!user) throw new Error("user not found");
  console.log(2);
  console.log(user);

  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);

  if (!isMatch) throw new Error("Invalid credentials");
  console.log(4);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1d",
  });
  console.log(token);

  return token;
};

// Register a new passenger
export const userRegisteration = async (userData: IUser) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = new User({ ...userData, password: hashedPassword });
  return await newUser.save();
};

// Get passenger profile
export const getUserProfile = async (id: string) => {
  return await User.findById(id);
};

// Update passenger profile
export const updateUserProfile = async (
  id: string,
  updateData: Partial<IUser>
) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

export const getTripsMade = async (id: string) => {
  const user =  await User.findById(id).populate("trips")
  return user?.trips
}