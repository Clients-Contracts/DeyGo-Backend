import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: 'superadmin' | 'admin';
}

const AdminSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'admin'], default: 'admin' }
});

const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);
export default Admin
