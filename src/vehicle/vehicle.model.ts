import mongoose, { Schema } from "mongoose";

export interface IVehicle extends Document {
    driver: mongoose.Types.ObjectId | string;
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    capacity: number;
    status: 'active' | 'inactive' | 'maintenance';
  }
  
  const VehicleSchema: Schema = new Schema({
    driver: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    licensePlate: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true },
    status: { type: String, enum: ['active', 'inactive', 'maintenance'], default: 'inactive' }
  });
  
  const Vehicle = mongoose.model<IVehicle>('Vehicle', VehicleSchema);
  export default Vehicle 
  