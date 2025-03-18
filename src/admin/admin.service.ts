import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import adminModel, { IAdmin } from "./admin.model";
import { generateToken } from "../utils/helpers";
import Driver from "../driver/driver.model";



export const allDrivers = async () => {
  const drivers = await Driver.find();
  return drivers;
};

export const findDriver = async (driverId: string) => {};
