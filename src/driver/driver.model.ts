import mongoose, { Schema, Document } from "mongoose";

export interface I_Driver extends Document {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  status: 'active' | 'inactive' | 'suspended';
  vehicle: mongoose.Types.ObjectId;
  rating: number;
  tripsCompleted: number;
}

const DriverSchema: Schema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'inactive' },
  vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
  rating: { type: Number, default: 0 },
  tripsCompleted: { type: Number, default: 0 }
});
const Driver = mongoose.model<I_Driver>('Driver', DriverSchema);
export default Driver

