import { IPayment } from 'types';
import Payment from './payment.model';

// Initiate a payment
export const initiatePayment = async (paymentData: IPayment) => {
  const newPayment = new Payment(paymentData);
  return await newPayment.save();
};

// Verify payment
export const verifyPayment = async (paymentId: string) => {
  // Add your payment gateway verification logic here
  // Example: Check payment status from an external API
  return await Payment.findById(paymentId);
};

// Get payment history for a passenger
export const getPaymentHistory = async (passengerId: string) => {
  return await Payment.find({ passengerId });
};

