// src/pages/Tutor/components/NotificationsSidebar.tsx

import type { Notification, Feedback } from '../mysessions.types';

interface NotificationsSidebarProps {
  notifications: Notification[];
  feedbacks: Feedback[];
}

const NotificationsSidebar = ({ notifications, feedbacks }: NotificationsSidebarProps) => {
  return (
    <div className="w-full lg:w-96 space-y-8 self-start sticky top-28">
      
      {/* Box: Thông báo */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Notifications</h2>
        <ul className="space-y-4">
          {notifications.map((noti) => (
            <li key={noti.id} className={`bg-white text-sm text-gray-700 border-l-4 pl-4 ${noti.isReminder ? 'border-red-500' : 'border-gray-300'}`}>
              {noti.isReminder && <span className="font-bold text-gray-900">Reminder: </span>}
              {noti.text}
            </li>
          ))}
        </ul>
      </div>

      {/* Box: Phản hồi gần đây */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Feedback</h2>
          <div className="space-y-4">
          {feedbacks.map((fb) => (
            <div key={fb.id} className="bg-white p-4 rounded-md shadow-inner">
              <p className="text-sm text-gray-800">"{fb.text}"</p>
              <p className="text-xs text-gray-500 mt-2 text-right">
                - <span className="font-semibold">{fb.student}</span> ({fb.session})
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default NotificationsSidebar;