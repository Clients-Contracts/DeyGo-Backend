import mongoose, { Schema, Document } from 'mongoose';

export interface I_Notification extends Document {
  passenger: mongoose.Types.ObjectId;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
  passenger: { type: Schema.Types.ObjectId, ref: 'passenger', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model<I_Notification>('Notification', NotificationSchema);

export default Notification