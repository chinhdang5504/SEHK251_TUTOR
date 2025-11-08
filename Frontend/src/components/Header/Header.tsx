import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import HeaderNone from './HeaderNone'
import { useUserProfile } from '@/hooks/useUserProfile'
import avatarImg from '@/assets/image/avatar.png'

const Header: React.FC = () => {

  const [notiOn, setNotiOn] = useState(false)
  const [showBoard, setShowBoard] = useState(false)
  const boardRef = useRef<HTMLDivElement | null>(null)

  const navigate = useNavigate()
  const location = useLocation()

  // <--- Determine current role based on route --->
  const isStudent = location.pathname.startsWith('/student')
  const isTutor = location.pathname.startsWith('/tutor')

  // <--- Fetch user profile (mock or API) --->
  // Set to true when connecting to real backend
  const { data: user, isLoading } = useUserProfile(false)

  // <--- Close dropdown when clicking outside --->
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (boardRef.current && !boardRef.current.contains(e.target as Node)) {
        setShowBoard(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // <--- Handlers --->
  const handleNotificationToggle = () => setNotiOn((prev) => !prev)
  const handleLogout = () => {
    console.log('Logout clicked')
    // TODO: clear token and redirect to login....
  }

  const handleViewProfile = () => {
    if (isStudent) navigate('/student/profile')
    else if (isTutor) navigate('/tutor/profile')
    else navigate('/')
  }

  // <--- Fallback if user not loaded --->
  const avatarSrc = user?.avatar || avatarImg
  const username = isLoading ? 'Loading...' : user?.userName || 'Tuong'

  return (
    <HeaderNone
      userName={username}
      avatar={avatarSrc}
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

export default Header
