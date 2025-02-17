import { INotification } from 'types';
import Notification from '../models/notification.model';

// Get all notifications for a passenger
export const getNotifications = async (passengerId: string) => {
  return await Notification.find({ passengerId });
};

// Mark a notification as read
export const markAsRead = async (id: string) => {
  return await Notification.findByIdAndUpdate(id, { isRead: true });
};

// Create a new notification
export const createNotification = async (notificationData: INotification) => {
  const newNotification = new Notification(notificationData);
  return await newNotification.save();
};

// Delete a notification
export const deleteNotification = async (id: string) => {
  return await Notification.findByIdAndDelete(id);
};
