export interface INotification {
  userId: string;
  title: string;
  message: string;
  isRead?: boolean;
  createdAt?: Date;
}

export interface ITripUser {
  userId: string;
  name: string;
  email: string;
}

export interface IPassenger {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  trips?: string[]; // Array of Trip IDs
}

export interface IVehicle {
  
}

export interface IPayment {
  _id?: string;
  user: string; // Reference to user
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
  users: ITripUser[]; // Array of Passenger IDs
  startLocation: string;
  endLocation: string;
  status: string;
  fare: number;
  startedAt?: Date;
  endedAt?: Date;
}


export interface IAdmin {

}

export interface IAdmin {
  
}