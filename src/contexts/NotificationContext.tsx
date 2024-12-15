import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { Notification, NotificationType, NotificationPriority } from '../types/notification';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}

type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'MARK_AS_READ'; payload: string }
  | { type: 'MARK_ALL_AS_READ' }
  | { type: 'CLEAR_ALL' };

interface NotificationContextType extends NotificationState {
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

function notificationReducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + (action.payload.read ? 0 : 1)
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
        unreadCount: state.unreadCount - (state.notifications.find(n => n.id === action.payload)?.read ? 0 : 1)
      };
    case 'MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
        unreadCount: state.unreadCount - (state.notifications.find(n => n.id === action.payload)?.read ? 0 : 1)
      };
    case 'MARK_ALL_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => ({ ...n, read: true })),
        unreadCount: 0
      };
    case 'CLEAR_ALL':
      return {
        notifications: [],
        unreadCount: 0
      };
    default:
      return state;
  }
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: [],
    unreadCount: 0
  });

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        ...notification,
        id,
        timestamp: new Date(),
        read: false
      }
    });

    // Auto-remove low priority notifications after 5 seconds
    if (notification.priority === 'low') {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
      }, 5000);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  }, []);

  const markAsRead = useCallback((id: string) => {
    dispatch({ type: 'MARK_AS_READ', payload: id });
  }, []);

  const markAllAsRead = useCallback(() => {
    dispatch({ type: 'MARK_ALL_AS_READ' });
  }, []);

  const clearAll = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL' });
  }, []);

  // Example: Subscribe to WebSocket events for real-time notifications
  useEffect(() => {
    // This would be your actual WebSocket connection
    const mockWebSocket = {
      onmessage: (callback: (data: any) => void) => {
        // Simulate incoming notifications
        const interval = setInterval(() => {
          if (Math.random() > 0.8) { // 20% chance of notification
            const types: NotificationType[] = ['info', 'success', 'warning', 'error'];
            const priorities: NotificationPriority[] = ['low', 'medium', 'high'];
            const type = types[Math.floor(Math.random() * types.length)];
            const priority = priorities[Math.floor(Math.random() * priorities.length)];

            callback({
              type,
              title: `Test ${type} notification`,
              message: `This is a test ${priority} priority notification`,
              priority,
              category: 'system'
            });
          }
        }, 30000); // Check every 30 seconds

        return () => clearInterval(interval);
      }
    };

    const unsubscribe = mockWebSocket.onmessage((data) => {
      addNotification(data);
    });

    return () => {
      unsubscribe();
    };
  }, [addNotification]);

  return (
    <NotificationContext.Provider
      value={{
        ...state,
        addNotification,
        removeNotification,
        markAsRead,
        markAllAsRead,
        clearAll
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
} 