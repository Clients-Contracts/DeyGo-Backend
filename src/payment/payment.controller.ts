import { Request, Response } from "express";
import * as PaymentService from "./payment.service";
import { IPayment } from "types";

// Initiate a payment
export const initiatePayment = async (req: Request, res: Response) => {
  try {
    const paymentData: IPayment = req.body;
    const newPayment = await PaymentService.initiatePayment(paymentData);
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ message: "Payment initiation failed", error });
  }
};

// Verify payment
export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const payment = await PaymentService.verifyPayment(req.params.id);
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Payment verification failed", error });
  }
};

//Get payment history for a passenger
export const getPaymentHistory = async (req: Request, res: Response) => {
  try {
    const passengerId = req.params.passengerId;
    const paymentHistory = await PaymentService.getPaymentHistory(passengerId);
    res.status(200).json(paymentHistory);
  } catch (error) {
    res.status(500).json({ message: "Failed to get payment history", error });
  }
};
