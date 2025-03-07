export interface INotification {
  passengerId: string;
  title: string;
  message: string;
  isRead?: boolean;
  createdAt?: Date;
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

