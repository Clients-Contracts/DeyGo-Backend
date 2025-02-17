import { Request, Response } from 'express';
import * as TripService from '../services/trip.service';
import { ITrip } from 'types';

// Create a new trip
export const createTrip = async (req: Request, res: Response) => {
  try {
    const tripData: ITrip = req.body;
    const newTrip = await TripService.createTrip(tripData);
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ message: 'Trip creation failed', error });
  }
};

// Join an existing trip
export const joinTrip = async (req: Request, res: Response) => {
  try {
    const trip = await TripService.joinTrip(req.params.tripId, req.body.userId);
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Failed to join trip', error });
  }
};

// Track a trip
export const trackTrip = async (req: Request, res: Response) => {
  try {
    const trip = await TripService.trackTrip(req.params.tripId);
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Failed to track trip', error });
  }
};

// Get trip history for a user
export const getTripHistory = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const tripHistory = await TripService.getTripHistory(userId);
      res.status(200).json(tripHistory);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get trip history', error });
    }
  };
  
  // Cancel a trip
  export const cancelTrip = async (req: Request, res: Response) => {
    try {
      const tripId = req.params.tripId;
      const userId = req.body.userId;
      const canceledTrip = await TripService.cancelTrip(tripId, userId);
      res.status(200).json({ message: 'Trip canceled', canceledTrip });
    } catch (error) {
      res.status(500).json({ message: 'Failed to cancel trip', error });
    }
  };