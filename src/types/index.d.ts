export interface INotification {
  passengerId: string;
  title: string;
  message: string;
  isRead?: boolean;
  createdAt?: Date;
}

export interface ITrippassenger {
  passengerId: string;
  fare: number;
  status: 'booked' | 'boarded' | 'completed' | 'cancelled';
}

export interface IPassenger {
  id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  trips?: string[]; // Array of Trip IDs
}

export interface IVehicle {
  
}
export interface IDriver {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  status: 'active' | 'inactive' | 'suspended';
  vehicle: string; // Reference to Vehicle ID
  rating: number;
  tripsCompleted: number;
}
export interface IPayment {
  _id?: string;
  passenger: string; // Reference to passenger
  trip: string; // Reference to trip
  amount: number;
  method: "card" | "cash" | "mobile_money";
  transactionDate: Date;
  status: "completed" | "pending" | "failed";
  URL?: string;
}

export interface ITrip {
  driverId: string;
  vehicleId: string;
  passengers: ITrippassenger[]; // Array of Passenger IDs
  startLocation: string;
  endLocation: string;
  status: 'requested' | 'ongoing' | 'completed' | 'cancelled';
  fare: number;
  startedAt?: Date;
  endedAt?: Date;
}


export interface IAdmin {

}

export interface IAdmin {
  
}