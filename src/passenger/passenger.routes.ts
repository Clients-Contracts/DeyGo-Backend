import express from 'express';
import { 
  register, 
  login, 
  getProfile, 
  updateProfile,
  getBookingHistory,
  resetPassword,
  fetchAllPassengers
} from './passenger.controller';
import { auth } from '../auth/auth.middleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/reset-password', resetPassword);
router.get('/profile/:id', getProfile);
router.put('/profile/:id', auth, updateProfile); 
router.get('/bookings/:id', getBookingHistory);
router.get('/all', fetchAllPassengers)
router.delete('/profile/:id', auth, )
export default router; 
