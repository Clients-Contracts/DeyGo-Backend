import { ITrip } from 'types';
import Trip from '../models/trip.model';

// Create a new trip
export const createTrip = async (tripData: ITrip) => {
  const newTrip = new Trip(tripData);
  return await newTrip.save();
};

// Join an existing trip
export const joinTrip = async (tripId: string, userId: string) => {
  const trip = await Trip.findById(tripId);
  if (!trip) throw new Error('Trip not found');

  trip.users.push(userId);
  return await trip.save();
};

// Track a trip
export const trackTrip = async (tripId: string) => {
  const trip = await Trip.findById(tripId);
  if (!trip) throw new Error('Trip not found');
  return trip;
};

// Get trip history for a user
// Get trip history for a user
export const getTripHistory = async (userId: string) => {
    const trips = await Trip.find({ users: userId }).sort({ startedAt: -1 });
    return trips;
  };
  
  // Cancel a trip
  export const cancelTrip = async (tripId: string, userId: string) => {
    const trip = await Trip.findById(tripId);
  
    if (!trip) {
      throw new Error('Trip not found');
    }
  
    // Check if the user is part of the trip
    if (!trip.users.includes(userId)) {
      throw new Error('User is not part of this trip');
    }
  
    // Only allow cancellation if the trip hasn't started
    if (trip.status !== 'requested') {
      throw new Error('Trip cannot be canceled');
    }
  
    // Remove the user from the trip
    trip.users = trip.users.filter(user => user !== userId);
  
    // If no users left, mark the trip as canceled
    if (trip.users.length === 0) {
      trip.status = 'canceled';
    }
  
    const updatedTrip = await trip.save();
    return updatedTrip;
  };