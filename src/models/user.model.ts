import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  provider: string;
  providerId: string;
}

const userSchema: Schema = new Schema(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "passenger" },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
