import express from 'express';
import { 
  createTrip, 
  joinTrip, 
  trackTrip, 
  getTripHistory, 
  cancelTrip 
} from './trip.controller';

const router = express.Router();

router.post('/', createTrip);
router.post('/join/:tripId', joinTrip);
router.get('/track/:tripId', trackTrip);
router.get('/history/:passengerId', getTripHistory);
router.delete('/cancel/:tripId', cancelTrip);

export default router;
