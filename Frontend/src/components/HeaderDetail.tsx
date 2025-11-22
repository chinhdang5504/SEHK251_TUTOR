import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import HeaderNone from './HeaderNone'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import Cookies from 'js-cookie'
import { logout } from '@/redux/slices/userSlice'
import { SSO_URL } from '@/utils/constant'


const DetailHeader: React.FC = () => {
  const [notiOn, setNotiOn] = useState(false)
  const [showBoard, setShowBoard] = useState(false)
  const boardRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const location = useLocation()

  // Determine current role based on route
  const isStudent = location.pathname.startsWith('/student')
  const isTutor = location.pathname.startsWith('/tutor')

  // Get user from Redux store
  const user = useSelector((state: RootState) => state.user)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (boardRef.current && !boardRef.current.contains(e.target as Node)) {
        setShowBoard(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handlers
  const handleNotificationToggle = () => setNotiOn((prev) => !prev)
  const handleLogout = () => {

    dispatch(logout())
    Cookies.remove('TOKEN')

    window.location.href = SSO_URL
  }

  const handleViewProfile = () => {
    if (isStudent) navigate('/student/profile')
    else if (isTutor) navigate('/tutor/profile')
    setShowBoard(false)
  }

  // User info
  const username = user?.fullName || 'Guest'
  const userInitial = username.charAt(0).toUpperCase()

  const avatarElement = (
    <div className='w-8 h-8 rounded-full bg-[#B3261E] text-white flex items-center justify-center font-bold'>
      {userInitial}
    </div>
  )

  return (
    <HeaderNone
      userName={username}
      avatar={avatarElement}
      notiOn={notiOn}
      showBoard={showBoard}
      onToggleNoti={handleNotificationToggle}
      onToggleBoard={() => setShowBoard((prev) => !prev)}
      onViewProfile={handleViewProfile}
      onLogout={handleLogout}
      boardRef={boardRef}
    />
  )
}

export default DetailHeader
