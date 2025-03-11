import express from 'express';
import { 
  getBookingHistory,
  fetchAllPassengers
} from './passenger.controller';
import { auth } from '../auth/auth.middleware';

const router = express.Router();

router.get('/bookings/:id', getBookingHistory);
router.get('/all', fetchAllPassengers)
router.delete('/profile/:id', auth, )

export default router; 
