import express from 'express';
import { 
  initiatePayment, 
  verifyPayment, 
  getPaymentHistory 
} from './payment.controller';

const router = express.Router();

router.post('/initiate', initiatePayment);
router.post('/verify', verifyPayment);
router.get('/history/:passengerId', getPaymentHistory);

export default router;
