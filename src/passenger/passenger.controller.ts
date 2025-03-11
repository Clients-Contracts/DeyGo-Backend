import { Request, Response } from 'express';
import * as PassengerService from './passenger.services';



//Get passenger booking history
export const getBookingHistory = async (req: Request, res: Response) => {
  try {
    const passengerId = req.params.id
    const bookingHistory = await PassengerService.getBookingHistory(passengerId);
    res.status(200).json(bookingHistory)
  } catch (error) {
    res.status(500).json({ message: 'Couldn\'t fetch booking history', error });
  }
}

//Get all passengers
export const fetchAllPassengers = async (req: Request, res:Response) => {
  try {
    const passengers = await PassengerService.getAllPassengers();
    res.status(200).json(passengers);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch all passengers', error})
  }
}

//Delete a passenger
export const deletePassenger = async (req: Request, res: Response) => {
  try {
    await PassengerService.deletePassenger(req.params.id);
    res.status(200).json({ message: 'Passenger deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete passenger', error });
  }
}