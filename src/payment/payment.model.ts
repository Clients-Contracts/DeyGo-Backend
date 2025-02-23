import mongoose, { Schema } from "mongoose";

export interface I_Payment extends Document {
    passenger: mongoose.Types.ObjectId;
    trip: mongoose.Types.ObjectId;
    amount: number;
    method: 'card' | 'mobile_money' | 'cash';
    status: 'pending' | 'completed' | 'failed';
    transactionDate: Date;
  }
  
  const PaymentSchema: Schema = new Schema({
    passenger: { type: Schema.Types.ObjectId, ref: 'passenger', required: true },
    trip: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
    amount: { type: Number, required: true },
    method: { type: String, enum: ['card', 'mobile_money', 'cash'], required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    transactionDate: { type: Date, default: Date.now }
  });
  
  export default mongoose.model<I_Payment>('Payment', PaymentSchema);
  