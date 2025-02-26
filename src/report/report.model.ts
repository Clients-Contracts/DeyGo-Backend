import mongoose, { Schema } from "mongoose";

export interface I_Report extends Document {
    passenger: mongoose.Types.ObjectId;
    driver: mongoose.Types.ObjectId;
    trip: mongoose.Types.ObjectId;
    reason: string;
    description: string;
    status: 'pending' | 'resolved';
    createdAt: Date;
  }
  
  const ReportSchema: Schema = new Schema({
    passenger: { type: Schema.Types.ObjectId, ref: 'passenger', required: true },
    driver: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
    trip: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
    reason: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
  });
  
  const Report = mongoose.model<I_Report>('Report', ReportSchema);
  export default Report 
  