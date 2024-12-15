import React, { useState, useEffect } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import { NotificationToastContainer } from './NotificationToast';
import { Notification } from '../../types/notification';

export function NotificationManager() {
  const { notifications, removeNotification } = useNotifications();
  const [toasts, setToasts] = useState<Notification[]>([]);

  useEffect(() => {
    // When a new notification arrives, add it to toasts if it's high priority
    const newNotifications = notifications.filter(
      notification => 
        notification.priority === 'high' && 
        !toasts.some(toast => toast.id === notification.id)
    );

    if (newNotifications.length > 0) {
      setToasts(prev => [...prev, ...newNotifications]);
    }
  }, [notifications]);

  const handleDismiss = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Limit the number of visible toasts to 3
  const visibleToasts = toasts.slice(0, 3);

  return (
    <NotificationToastContainer
      notifications={visibleToasts}
      onDismiss={handleDismiss}
    />
  );
} 