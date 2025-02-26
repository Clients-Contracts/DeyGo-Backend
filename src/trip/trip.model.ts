import mongoose, { Schema, Document } from 'mongoose';

export interface I_TripPassenger {
  passenger: mongoose.Types.ObjectId;
  status: 'booked' | 'boarded' | 'completed' | 'cancelled';
}

export interface I_Trip extends Document {
  passengers: I_TripPassenger[];
  driver: mongoose.Types.ObjectId;
  vehicle: mongoose.Types.ObjectId;
  startLocation: mongoose.Types.ObjectId;
  endLocation: mongoose.Types.ObjectId;
  totalFare: number;
  status: 'requested' | 'ongoing' | 'completed' | 'cancelled';
  startedAt: Date;
  endedAt: Date;
  createdAt: Date;
}

const TripSchema: Schema = new Schema({
  passengers: [
    {
      passenger: { type: Schema.Types.ObjectId, ref: 'passenger', required: true },
      fare: { type: Number, required: true },
      status: { 
        type: String, 
        enum: ['booked', 'boarded', 'completed', 'cancelled'], 
        default: 'booked' 
      }
    }
  ],
  driver: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
  vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  startLocation: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
  endLocation: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
  totalFare: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['requested', 'ongoing', 'completed', 'cancelled'], 
    default: 'requested' 
  },
  startedAt: Date,
  endedAt: Date,
  createdAt: { type: Date, default: Date.now }
});

const Trip = mongoose.model<I_Trip>('Trip', TripSchema);
export default Trip
