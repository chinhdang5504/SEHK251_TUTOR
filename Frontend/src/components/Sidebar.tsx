import { Book, Calendar, HelpCircle, Settings, Home, Star, Menu } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'

// --- Types ---
type Role = 'STUDENT' | 'TUTOR'

interface SidebarItem {
  path: string
  content: string
  icon: any
}

interface SidebarItemsByRole {
  STUDENT: SidebarItem[]
  TUTOR: SidebarItem[]
}

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false)

  // Lấy user từ redux store
  const user = useSelector((state: RootState) => state.user)
  const role: Role = (user?.role as Role) || 'STUDENT'

  // --- Sidebar items ---
  const sidebarItemsByRole: SidebarItemsByRole = {
    STUDENT: [
      { path: '/student/dashboard', content: 'Dashboard', icon: Home },
      { path: '/student/tutors', content: 'Tutor', icon: Book },
      { path: '/student/public-session', content: 'Public Sessions', icon: Star },
      { path: '/library', content: 'Library', icon: Calendar }
    ],
    TUTOR: [
      { path: '/tutor/dashboard', content: 'Dashboard', icon: Home },
      { path: '/library', content: 'Library', icon: Calendar }
    ]
  }

  const sidebarItems = sidebarItemsByRole[role]

  const footer = [
    { icon: HelpCircle, content: 'Get help' },
    { icon: Settings, content: 'Settings' }
  ]

  return (
    <>
      {/* Overlay */}
      <div
        className={`xl:hidden fixed inset-0 bg-black/50 z-[9] top-20 transition-opacity duration-300 
          ${showSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowSidebar(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed flex flex-col top-20 left-[20px] bg-white 
          h-[calc(100vh-80px-30px)] z-[10] w-[230px] border-t border-r rounded-tr-[12px]
          transition-transform duration-300 ease-in-out xl:translate-x-0 
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='space-y-1 mt-4'>
          {sidebarItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.content === 'Dashboard'}
              className={({ isActive }) =>
                `flex w-full h-[50px] items-center transition-all duration-200 rounded-[12px] pl-4 pr-4
                 ${isActive ? 'bg-[#B3261E] text-white font-[600]' : 'text-gray-600 hover:bg-gray-200 hover:font-[500]'}`
              }
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <item.icon className='w-5 h-5 mr-3 transition-transform duration-200 hover:scale-110' />
              <span className='text-sm'>{item.content}</span>

              {item.content === 'Public Sessions' && (
                <span
                  className='ml-auto w-5 h-5 flex items-center justify-center rounded-full text-xs font-[600]
                    bg-[#B3261E] text-white'
                >
                  3
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Footer */}
        <div className='mt-auto flex flex-col justify-start mb-4'>
          {footer.map((item, index) => (
            <button
              key={item.content}
              className='text-gray-400 font-[500] text-[14px] ml-4 mb-2 inline-flex items-center gap-2
                transition-all duration-200 hover:text-[#B3261E] hover:translate-x-1'
              style={{ animationDelay: `${(sidebarItems.length + index) * 50}ms` }}
            >
              <item.icon className='w-5 h-5' />
              {item.content}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile toggle button */}
      <button
        className='xl:hidden fixed top-6 left-4 bg-[#B3261E] text-white w-10 h-10 rounded-lg z-[11]
          flex items-center justify-center'
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu className='w-5 h-5' />
      </button>
    </>
  )
}

export default Sidebar
