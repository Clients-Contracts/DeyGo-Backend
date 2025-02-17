import express from 'express';
import { 
  registerPassenger, 
  loginPassenger, 
  getPassengerProfile, 
  updatePassengerProfile,
  getBookingHistory
} from '../controllers/passenger.controller';

const router = express.Router();

router.post('/register', registerPassenger);
router.post('/login', loginPassenger);
router.get('/profile/:id', getPassengerProfile);
router.put('/profile/:id', updatePassengerProfile);
router.get('/bookings/:id', getBookingHistory);

export default router;
