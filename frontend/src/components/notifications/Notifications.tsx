import styled from '@emotion/styled';
import { Theme } from '../../themes';
import { useState, useEffect } from 'react';

const NotificationsWrapper = styled.div<{ theme: Theme }>`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const NotificationItem = styled.div<{ theme: Theme; read: boolean }>`
  background: ${({ theme, read }) => (read ? theme.cardBg : theme.primary + '20')};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.primary + '40'};
  }
`;

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

interface NotificationsProps {
  theme: Theme;
}

const Notifications: React.FC<NotificationsProps> = ({ theme }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/notifications', {
      headers: { 'Authorization': 'Bearer your_jwt_token_here' }
    })
      .then(res => res.json())
      .then(data => setNotifications(data));
  }, []);

  const markAsRead = (id: number) => {
    fetch(`http://localhost:3000/api/notifications/${id}/mark_as_read`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer your_jwt_token_here' }
    })
      .then(res => res.json())
      .then(updatedNotification => {
        setNotifications(notifications.map(n => n.id === id ? updatedNotification : n));
      });
  };

  return (
    <NotificationsWrapper theme={theme}>
      <h2>Notifications</h2>
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          theme={theme}
          read={notification.read}
          onClick={() => markAsRead(notification.id)}
        >
          {notification.message}
        </NotificationItem>
      ))}
    </NotificationsWrapper>
  );
};

export default Notifications;
