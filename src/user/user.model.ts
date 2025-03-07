import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  provider?: string;
  providerId?: string;
  trips: ObjectId[];
}

const userSchema: Schema = new Schema(
  {
    provider: { type: String },
    providerId: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    trips: [{ type: Schema.ObjectId, ref: "Trip" }],
  },
  { timestamps: true, discriminatorKey: "role" }
);

 const User = mongoose.model<IUser>("User", userSchema);
 export default User