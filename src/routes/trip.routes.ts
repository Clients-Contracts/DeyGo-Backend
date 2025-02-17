import express from 'express';
import { 
  createTrip, 
  joinTrip, 
  trackTrip, 
  getTripHistory, 
  cancelTrip 
} from '../controllers/trip.controller';

const router = express.Router();

router.post('/', createTrip);
router.post('/join/:tripId', joinTrip);
router.get('/track/:tripId', trackTrip);
router.get('/history/:userId', getTripHistory);
router.delete('/cancel/:tripId', cancelTrip);

export default router;
