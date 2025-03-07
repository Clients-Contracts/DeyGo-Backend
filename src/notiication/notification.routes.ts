import express from 'express';
import { 
  getNotifications, 
  markAsRead, 
  createNotification, 
  deleteNotification 
} from './notification.controller';

const router = express.Router();

router.get('/', getNotifications);
router.patch('/:id/read', markAsRead);
router.post('/create', createNotification);
router.delete('/delete/:id', deleteNotification);

export default router
