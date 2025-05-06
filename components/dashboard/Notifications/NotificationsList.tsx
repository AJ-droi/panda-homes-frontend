/* eslint-disable */
"use client"
import { useState } from 'react';
import NotificationItem from './NotificationItem';

const NotificationsList = ({ initialNotifications = [] }: any) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleDismiss = (id:any) => {
    setNotifications(notifications.filter((notification:any) => notification.id !== id));
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold px-2 pt-6 pb-4 text-[#000]">Notifications</h1>
      <div className="divide-y divide-gray-200">
        {notifications.length > 0 ? (
          notifications.map((notification:any) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onDismiss={handleDismiss}
            />
          ))
        ) : (
          <div className="py-8 text-center text-gray-500">
            No notifications to display
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsList;