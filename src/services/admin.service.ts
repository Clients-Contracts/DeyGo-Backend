import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { IAdmin, IDriver } from "types";
import driverModel from "models/driver.model";
import adminModel from "models/admin.model";
import { generateToken } from "utils/helpers";

export const register = async (data: IAdmin) => {
  const existingAccount = await adminModel.findOne({ email: data.email });
  if (existingAccount) throw new Error(`Already registered`);

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newAdmin = await driverModel.create({
    ...data,
    password: hashedPassword,
  });

  return newAdmin;
};

export const login = async (data: { email: string; password: string }) => {
  const admin = await adminModel.findOne({ email: data.email });
  if (!admin) throw new Error(`No account found with this email`);

  const isMatch = await bcrypt.compare(data.password, admin.password);
  if (!isMatch) throw new Error(`Incorrect password`);

  const token = generateToken(admin._id as string);
  return token;
};

export const allDrivers = async () => {
    const drivers = await driverModel.find();
    return drivers;
}

export const findDriver = async (driverId: string) => {

}