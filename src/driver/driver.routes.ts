import express from 'express';
import { 
  getVehicleDetails,
  updateVehicleDetails,
  getCurrentTrip,
  getTripHistory,
  acceptTrip,
  completeTrip,
  getPaymentHistory,
  getNotifications
} from './driver.controller';

const router = express.Router();


// Vehicle Management Routes
router.get('/vehicle/:id', getVehicleDetails);
router.put('/vehicle/:id', updateVehicleDetails);

// Trip Management Routes
router.get('/trips/current', getCurrentTrip);
router.get('/trips/history', getTripHistory);
router.put('/trips/accept/:id', acceptTrip);
router.put('/trips/complete/:id', completeTrip);

// Payment and Notifications
router.get('/payments/history', getPaymentHistory);
router.get('/notifications', getNotifications);

export default router;
