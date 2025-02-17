import express from 'express';
import { 
  register, 
  login, 
  getProfile, 
  updateProfile,
  getBookingHistory
} from '../controllers/passenger.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);
router.get('/bookings/:id', getBookingHistory);

export default router;
