import mongoose, { Schema, Document } from "mongoose";
import User from "user/user.model";

export interface IDriver extends Document {
  status: 'active' | 'inactive' | 'suspended';
  vehicle: mongoose.Types.ObjectId;
  rating: number;
  tripsCompleted: number;
}

const DriverSchema: Schema = new Schema({
  status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'inactive' },
  vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
  rating: { type: Number, default: 0 },
  tripsCompleted: { type: Number, default: 0 }
});
const Driver = User.discriminator<IDriver>('Driver', DriverSchema);

export default Driver

