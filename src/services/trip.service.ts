import { ITrip } from 'types';
import Trip from '../models/trip.model';

// Create a new trip
export const createTrip = async (tripData: ITrip) => {
  const newTrip = new Trip(tripData);
  return await newTrip.save();
};

// Join an existing trip
export const joinTrip = async (tripId: string, passengerId: string|any) => {
  const trip = await Trip.findById(tripId);
  if (!trip) throw new Error('Trip not found');

  trip.passengers.push({passenger:passengerId, status: "booked"});
  return await trip.save();
};

// Track a trip
export const trackTrip = async (tripId: string) => {
  const trip = await Trip.findById(tripId);
  if (!trip) throw new Error('Trip not found');
  return trip;
};

// Get trip history for a passenger
// Get trip history for a passenger
export const getTripHistory = async (passengerId: string) => {
    const trips = await Trip.find({ passengers: passengerId }).sort({ startedAt: -1 });
    return trips;
  };
  
  // Cancel a trip
  export const cancelTrip = async (tripId: string, passengerId: string|any) => {
    const trip = await Trip.findById(tripId);
  
    if (!trip) {
      throw new Error('Trip not found');
    }
  
    // Check if the passenger is part of the trip
    if (!trip.passengers.includes({passenger: passengerId, status: "booked"})) {
      throw new Error('passenger is not part of this trip');
    }
  
    // Only allow cancellation if the trip hasn't started
    if (trip.status !== 'requested') {
      throw new Error('Trip cannot be cancelled');
    }
  
    // Remove the passenger from the trip
    trip.passengers = trip.passengers.filter(passenger => passenger !== passengerId);
  
    // If no passengers left, mark the trip as cancelled
    if (trip.passengers.length === 0) {
      trip.status = 'cancelled';
    }
  
    const updatedTrip = await trip.save();
    return updatedTrip;
  };
