import { Request, Response } from 'express';
import * as driverService from './driver.service';

// Get vehicle details by driver ID
export const getVehicleDetails = async (req: Request, res: Response) => {
  try {
    const vehicle = await driverService.getDriverVehicleDetails(req.params.id);
    res.status(200).json(vehicle);
  } catch (error) {
        res.status(500).json({ message: '', error });

  }
};

// Update vehicle details
export const updateVehicleDetails = async (req: Request, res: Response) => {
  try {
    const updatedVehicle = await driverService.updateDriverVehicleDetails(req.params.id, req.body);
    res.status(200).json(updatedVehicle);
  } catch (error) {
        res.status(500).json({ message: '', error });

  }
};

// Get current active trip
export const getCurrentTrip = async (req: Request, res: Response) => {
  try {
    const trip = await driverService.getCurrentTrip(req.params.id);
    res.status(200).json(trip);
  } catch (error) {
        res.status(500).json({ message: '', error });

  }
};

// Get trip history
export const getTripHistory = async (req: Request, res: Response) => {
  try {
    const trips = await driverService.getTripHistory(req.params.id);
    res.status(200).json(trips);
  } catch (error) {
        res.status(500).json({ message: '', error });

  }
};

// Accept a trip request
export const acceptTrip = async (req: Request, res: Response) => {
  try {
    const trip = await driverService.acceptTrip(req.params.id, req.params.id);
    res.status(200).json(trip);
  } catch (error) {
        res.status(500).json({ message: '', error });

  }
};

// Complete a trip
export const completeTrip = async (req: Request, res: Response) => {
  try {
    const trip = await driverService.completeTrip(req.params.id, req.params.id);
    res.status(200).json(trip);
  } catch (error) {
        res.status(500).json({ message: '', error });

  }
};

// Get payment history for driver
export const getPaymentHistory = async (req: Request, res: Response) => {
  try {
    const payments = await driverService.getDriverPaymentHistory(req.params.id);
    res.status(200).json(payments);
  } catch (error) {
        res.status(500).json({ message: '', error });

  }
};

// Get notifications for driver
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await driverService.getNotifications(req.params.id);
    res.status(200).json(notifications);
  } catch (error) {
        res.status(500).json({ message: '', error });

  }
};
