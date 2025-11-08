import {
  faBook,
  faCalendar,
  faChartSimple,
  faCircleQuestion,
  faGear,
  faHouse,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  // ✅ Giả lập user (sau này thay bằng redux hoặc context)
  const mockUser = {
    name: 'Duong Huy Tuong',
    role: 'STUDENT', // hoặc 'TUTOR'
  };

  // ✅ Menu động theo role
  const sidebarItem =
    mockUser.role === 'STUDENT'
      ? [
          { path: '/student/dashboard', content: 'Dashboard', icon: faHouse },
          { path: '/student/tutors', content: 'Tutor', icon: faBook },
          { path: '/student/public-session', content: 'Public sessions', icon: faStar },
          { path: '/student/library', content: 'HCMUT-LIBRARY', icon: faCalendar },
        ]
      : [
          { path: '/tutor/dashboard', content: 'Dashboard', icon: faHouse },
          { path: '/tutor/session-details', content: 'Session Detail', icon: faBook },
          { path: '/tutor/library', content: 'Library', icon: faCalendar },
        ];

  const footer = [
    { icon: faCircleQuestion, content: 'Get help' },
    { icon: faGear, content: 'Setting' },
  ];

  return (
    <>
      {/* Overlay (mobile) */}
      <div
        className={`xl:hidden fixed inset-0 bg-black/50 z-[9] top-20 transition-opacity duration-300 ${
          showSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShowSidebar(false)}
      />

      {/* Sidebar chính */}
      <div
        className={`fixed flex flex-col top-20 left-[20px] bg-white h-[calc(100vh-80px-30px)] z-[10] w-[230px] border-t border-r rounded-tr-[12px] transition-transform duration-300 ease-in-out xl:translate-x-0 ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Danh sách menu */}
        <div className="space-y-1">
          {sidebarItem.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.content === 'Dashboard'}
              className={({ isActive }) =>
                `flex w-full h-[50px] items-center transition-all duration-200 rounded-[12px]
                 ${item.content === 'Public sessions' ? 'justify-between pl-[10px] pr-[20px]' : 'pl-[10px] pr-[10px]'}
                 ${showSidebar ? 'animate-slideIn' : ''}
                 ${isActive ? 'bg-[#B3261E] text-white font-[600]' : 'text-[#262626] hover:bg-[#E0E0E0] hover:font-[500]'}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={item.icon}
                  className="transition-transform duration-200 hover:scale-110"
                />
                <p className="transition-all duration-200">{item.content}</p>
              </div>

              {/* Badge cho Public sessions */}
              {item.content === 'Public sessions' && (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `w-5 h-5 flex items-center justify-center rounded-full text-xs font-[600] transition-colors
                     ${isActive ? 'bg-white text-[#B3261E]' : 'bg-[#B3261E] text-white'}`}
                >
                  3
                </NavLink>
              )}
            </NavLink>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto flex flex-col justify-start mb-4">
          {footer.map((item, index) => (
            <button
              key={item.content}
              className={`text-gray-400 font-[500] text-[14px] ml-4 p-0 mb-2 inline-flex items-center gap-2 transition-all duration-200 hover:text-[#B3261E] hover:translate-x-1 ${
                showSidebar ? 'animate-slideIn' : ''
              }`}
              style={{
                animationDelay: `${(sidebarItem.length + index) * 50}ms`,
              }}
            >
              <FontAwesomeIcon icon={item.icon} />
              {item.content}
            </button>
          ))}
        </div>
      </div>

      {/* Nút mở sidebar (mobile) */}
      <button
        className="xl:hidden fixed top-6 left-4 bg-[#B3261E] text-white w-10 h-10 rounded-lg z-[11] flex items-center justify-center"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        ☰
      </button>
    </>
  );
};

export default Sidebar;
