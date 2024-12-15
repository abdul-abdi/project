import React, { useMemo } from 'react';
import { 
  CheckCircle, 
  Info, 
  AlertTriangle, 
  AlertCircle, 
  X, 
  Bell, 
  Check,
  Trash2
} from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { Notification, NotificationGroup } from '../../types/notification';
import { formatDate } from '../../utils/formatters';
import clsx from 'clsx';

interface NotificationCenterProps {
  onClose: () => void;
}

export function NotificationCenter({ onClose }: NotificationCenterProps) {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    removeNotification,
    clearAll,
    unreadCount 
  } = useNotifications();

  const notificationGroups = useMemo(() => {
    const groups: NotificationGroup[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    notifications.forEach(notification => {
      const notificationDate = new Date(notification.timestamp);
      notificationDate.setHours(0, 0, 0, 0);

      let groupDate: Date;
      if (notificationDate.getTime() === today.getTime()) {
        groupDate = today;
      } else if (notificationDate.getTime() === yesterday.getTime()) {
        groupDate = yesterday;
      } else {
        groupDate = notificationDate;
      }

      const existingGroup = groups.find(g => g.date.getTime() === groupDate.getTime());
      if (existingGroup) {
        existingGroup.notifications.push(notification);
      } else {
        groups.push({
          date: groupDate,
          notifications: [notification]
        });
      }
    });

    return groups.sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [notifications]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
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

  const getDateLabel = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.getTime() === today.getTime()) {
      return 'Today';
    } else if (date.getTime() === yesterday.getTime()) {
      return 'Yesterday';
    } else {
      return formatDate(date);
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="p-8 text-center">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
          <p className="text-sm text-gray-500">
            When you have notifications, they'll show up here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {unreadCount} unread notifications
          </div>
          <div className="flex items-center space-x-4">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
              >
                <Check className="h-4 w-4" />
                <span>Mark all as read</span>
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={clearAll}
                className="text-sm text-gray-600 hover:text-gray-700 flex items-center space-x-1"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear all</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 max-h-[calc(100vh-200px)] overflow-y-auto">
        {notificationGroups.map((group, groupIndex) => (
          <div key={group.date.toISOString()} className="bg-white">
            <div className="px-4 py-2 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-500">
                {getDateLabel(group.date)}
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {group.notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={clsx(
                    'p-4 hover:bg-gray-50 transition-colors',
                    !notification.read && 'bg-blue-50 hover:bg-blue-50'
                  )}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {notification.message}
                          </p>
                          {notification.actionLabel && (
                            <a
                              href={notification.actionUrl}
                              className="inline-flex items-center mt-2 text-sm text-blue-600 hover:text-blue-700"
                            >
                              {notification.actionLabel}
                            </a>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {formatDate(notification.timestamp, 'relative')}
                          </span>
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="mt-2 text-xs text-blue-600 hover:text-blue-700"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 