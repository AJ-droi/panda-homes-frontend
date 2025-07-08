// components/Notifications/NotificationItem.tsx
/* eslint-disable */
import { X } from 'lucide-react';

const NotificationItem = ({ notification, onDismiss }:any) => {
  return (
    <div className="py-4 px-2 gap-4 border-b border-gray-200 flex justify-between items-center">
      <div className=''>
        <p className="text-[#000] mb-1">{notification.message}</p>
        <p className="text-gray-500 text-sm">{notification.date}</p>
      </div>
      <button 
        onClick={() => onDismiss(notification.id)} 
        className="p-1 hover:bg-gray-100 rounded-full transition-colors hover:cursor-pointer"
        aria-label="Dismiss notification"
      >
        <X className="h-5 w-5 text-[#222222]" />
      </button>
    </div>
  );
};


export default NotificationItem