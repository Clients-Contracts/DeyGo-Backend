import { Request, Response } from "express";
import * as adminService from "../admin/admin.service";
import * as notificationService from "../notiication/notification.service";

// Authentication Management
export const registerAdmin = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "", error });
  }
};
export const loginAdmin = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "", error });
  }
};

// Drivers' management
export const fetchDrivers = async (req: Request, res: Response) => {
  try {
    const drivers = await adminService.allDrivers();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: "", error });
  }
};

export const getDriver = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "", error });
  }
};

export const approveDriver = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "", error });
  }
};

export const rejectDriver = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "", error });
  }
};

//Profile management
export const fetchAdminData = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "", error });
  }
};

export const updateAdminData = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "", error });
  }
};


//Reports Management

//Disputes Management

//Pricing Management
