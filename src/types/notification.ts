export type NotificationType = 'info' | 'success' | 'warning' | 'error';
export type NotificationPriority = 'low' | 'medium' | 'high';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: NotificationPriority;
  actionUrl?: string;
  actionLabel?: string;
  projectId?: string;
  category?: 'project' | 'system' | 'team' | 'deadline' | 'budget';
}

export interface NotificationGroup {
  date: Date;
  notifications: Notification[];
} 