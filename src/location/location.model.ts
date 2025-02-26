import mongoose, { Schema } from "mongoose";

export interface I_Location extends Document {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  }
  
  const LocationSchema: Schema = new Schema({
    name: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  });
  
  const Location = mongoose.model<I_Location>('Location', LocationSchema);
  export default Location
  