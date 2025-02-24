import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface I_Passenger extends Document {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  provider?: string;
  providerId?: string;
  trips: ObjectId[];
  receipts: ObjectId[]
}

const passengerSchema: Schema = new Schema(
  {
    provider: { type: String },
    providerId: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    trips: [{ type: Schema.ObjectId, ref: "Trip" }],
    receipts: [{ type: Schema.ObjectId, ref: "Receipt" }]
  },
  { timestamps: true }
);

export default mongoose.model<I_Passenger>("Passenger", passengerSchema);
