import { Bell, BellOff, ChevronDown } from 'lucide-react'
import logo from '@/assets/image/logo.png'

export interface HeaderNoneProps {
  userName: string
  avatar: string | React.ReactNode
  notiOn: boolean
  showBoard: boolean
  onToggleNoti: () => void
  onToggleBoard: () => void
  onViewProfile: () => void
  onLogout: () => void
  boardRef: React.RefObject<HTMLDivElement | null>
}

const HeaderNone = ({
  userName,
  avatar,
  notiOn,
  showBoard,
  onToggleNoti,
  onToggleBoard,
  onViewProfile,
  onLogout,
  boardRef
}: HeaderNoneProps) => {
  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-white flex items-center justify-between h-16 px-6'>
      {/* Logo */}
      <div className='flex items-center'>
        <img src={logo} alt='logo' className='h-10 w-auto object-contain' />
      </div>

      {/* Notification + Avatar */}
      <div className='flex items-center gap-4'>
        <button
          onClick={onToggleNoti}
          className='rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition'
        >
          {notiOn ? <Bell className='text-red-500 w-5 h-5' /> : <BellOff className='text-gray-700 w-5 h-5' />}
        </button>

        <div className='relative' ref={boardRef}>
          <button
            onClick={onToggleBoard}
            className='bg-gray-100 inline-flex items-center gap-2 hover:bg-gray-200 transition rounded-[12px] p-[8px] px-[16px]'
          >
            {typeof avatar === 'string' ? (
              <img src={avatar} alt='avatar' className='w-8 h-8 rounded-full object-cover' />
            ) : (
              avatar
            )}
            <span className='text-gray-800 text-sm font-medium'>{userName}</span>
            <ChevronDown className='text-gray-600 w-4 h-4' />
          </button>

          {/* Dropdown */}
          {showBoard && (
            <div className='absolute w-36 right-0 mt-2 bg-white border border-gray-200 rounded-[12px] shadow-lg flex flex-col text-sm'>
              <button className='px-4 py-3 text-left hover:bg-gray-100 transition-colors' onClick={onViewProfile}>
                View Profile
              </button>
              <button className='px-4 py-3 text-left hover:bg-gray-100 transition-colors' onClick={onLogout}>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeaderNone
