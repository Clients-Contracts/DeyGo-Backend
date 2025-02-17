import Notification, { INotification } from '../models/notification.model';

// Get all notifications for a user
export const getNotifications = async (userId: string) => {
  return await Notification.find({ userId });
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
