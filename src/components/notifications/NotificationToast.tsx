import React, { useEffect, useState } from 'react';
import { X, CheckCircle, Info, AlertTriangle, AlertCircle } from 'lucide-react';
import { Notification } from '../../types/notification';
import { useNotifications } from '../../contexts/NotificationContext';
import { formatDate } from '../../utils/formatters';
import clsx from 'clsx';

interface NotificationToastProps {
  notification: Notification;
  onDismiss: () => void;
}

export function NotificationToast({ notification, onDismiss }: NotificationToastProps) {
  const [isExiting, setIsExiting] = useState(false);
  const { markAsRead } = useNotifications();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsExiting(true);
    }, 4500); // Start exit animation after 4.5s

    const dismissTimeout = setTimeout(() => {
      onDismiss();
    }, 5000); // Remove after 5s

    return () => {
      clearTimeout(timeout);
      clearTimeout(dismissTimeout);
    };
  }, [onDismiss]);

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getBorderColor = () => {
    switch (notification.type) {
      case 'success':
        return 'border-green-500';
      case 'info':
        return 'border-blue-500';
      case 'warning':
        return 'border-amber-500';
      case 'error':
        return 'border-red-500';
    }
  };

  return (
    <div
      className={clsx(
        'max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto border-l-4',
        getBorderColor(),
        'transform transition-all duration-500',
        isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
      )}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {notification.title}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {notification.message}
            </p>
            {notification.actionLabel && (
              <div className="mt-2">
                <a
                  href={notification.actionUrl}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  {notification.actionLabel}
                </a>
              </div>
            )}
            <p className="mt-1 text-xs text-gray-400">
              {formatDate(notification.timestamp, 'relative')}
            </p>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              onClick={() => {
                setIsExiting(true);
                setTimeout(onDismiss, 500);
              }}
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NotificationToastContainerProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

export function NotificationToastContainer({ notifications, onDismiss }: NotificationToastContainerProps) {
  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 z-50"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            notification={notification}
            onDismiss={() => onDismiss(notification.id)}
          />
        ))}
      </div>
    </div>
  );
} 