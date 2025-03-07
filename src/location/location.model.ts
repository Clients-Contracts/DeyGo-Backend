import mongoose, { Schema } from "mongoose";

export interface ILocation extends Document {
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
  
  const Location = mongoose.model<ILocation>('Location', LocationSchema);
  export default Location
  