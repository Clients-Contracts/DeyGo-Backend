import Passenger, { IPassenger } from './passenger.model';


//Get booking history
export const getBookingHistory = async (id: string) => {

}

//Get all passengers
export const getAllPassengers = async () => {
  return await Passenger.find({});
};

//Delete a passenger
export const deletePassenger = async (id: string) => {
  return await Passenger.findByIdAndDelete(id);
};