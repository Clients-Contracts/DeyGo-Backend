import { Request, Response } from 'express';
import * as NotificationService from './notification.service';
import { INotification } from 'types';

// Get all notifications for a passenger
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await NotificationService.getNotifications(req.params.passengerId);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get notifications', error });
  }
};

// Mark notification as read
export const markAsRead = async (req: Request, res: Response) => {
  try {
    await NotificationService.markAsRead(req.params.id);
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark as read', error });
  }
};

// Create a new notification
export const createNotification = async (req: Request, res: Response) => {
  try {
    const notificationData: INotification = req.body;
    const newNotification = await NotificationService.createNotification(notificationData);
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create notification', error });
  }
};

// Delete a notification
export const deleteNotification = async (req: Request, res: Response) => {
  try {
    await NotificationService.deleteNotification(req.params.id);
    res.status(200).json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete notification', error });
  }
};
