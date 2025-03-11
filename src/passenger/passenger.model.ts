import mongoose, { Schema, Document, ObjectId } from "mongoose";
import User from "../user/user.model"

export interface IPassenger extends Document {
  receipts: ObjectId[] | string[];
  bookingHistory: string[]
}

const passengerSchema: Schema = new Schema(
  {
    receipts: [{ type: Schema.ObjectId, ref: "Receipt" }],
    bookingHistory: [{}]
  },
  { timestamps: true }
);

const Passenger =  User.discriminator<IPassenger>("Passenger", passengerSchema);
export default Passenger