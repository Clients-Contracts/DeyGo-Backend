import express from 'express';
import { 
  getNotifications, 
  markAsRead, 
  createNotification, 
  deleteNotification 
} from '../controllers/notification.controller';

const router = express.Router();

router.get('/', getNotifications);
router.patch('/:id/read', markAsRead);
router.post('/', createNotification);
router.delete('/:id', deleteNotification);

export default router
