import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faBell, faBellSlash } from '@fortawesome/free-regular-svg-icons'
import logo from '@/assets/image/logo.png'
import { useUserProfile } from '@/hooks/useUserProfile'
import avatarImg from '@/assets/image/avatar.png'

interface HeaderProps {
  onSearch: (query: string) => void
  loading?: boolean
  notFound?: boolean
  placeholder?: string
}

const HeaderSearch = ({
  onSearch,
  loading = false,
  notFound = false,
  placeholder = 'Search tutor by name, subject, department'
}: HeaderProps) => {
  const [notiOn, setNotiOn] = useState(false)
  const [showBoard, setShowBoard] = useState(false)
  const [searchText, setSearchText] = useState('')

  /* <--- Load user data using React Query hook ---> */
  const { data: user, isLoading } = useUserProfile(false)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const boardRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const isStudent = location.pathname.startsWith('/student')
  const isTutor = location.pathname.startsWith('/tutor')

  /* <--- Close dropdown when clicking outside ---> */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (boardRef.current && !boardRef.current.contains(e.target as Node)) {
        setShowBoard(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  /* <--- Search handler ---> */
  const handleSearch = () => {
    if (!searchText.trim()) return
    onSearch(searchText.trim())
  }

  const handleToggleBoard = () => setShowBoard(prev => !prev)
  const handleToggleNoti = () => setNotiOn(prev => !prev)

  const handleViewProfile = () => {
    if (isStudent) navigate('/student/profile')
    else if (isTutor) navigate('/tutor/profile')
    else navigate('/')
    setShowBoard(false)
  }

  const handleLogout = () => {
    console.log('Logout clicked')
    setShowBoard(false)
    // TODO: clear token + redirect to login
  }

  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md flex items-center h-16 px-5'>
      {/* Logo */}
      <div className='flex items-center mr-10'>
        <img src={logo} alt='logo' className='h-10 w-auto object-contain' />
      </div>

      {/* Search bar */}
      <div className='flex-1 relative mx-[80px] flex items-center'>
        <input
          ref={inputRef}
          type='text'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder={placeholder}
          className='w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm text-gray-700 focus:outline-none focus:font-semibold transition-all'
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors cursor-pointer ${
            searchText || (inputRef.current && inputRef.current === document.activeElement)
              ? 'text-red-500'
              : 'text-gray-400'
          }`}
          onClick={handleSearch}
        />
      </div>

      {/* Right section */}
      <div className='flex items-center gap-4 ml-6'>
        {/* Notification button */}
        <button
          onClick={handleToggleNoti}
          className='rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition p-[10px]'
        >
          <FontAwesomeIcon
            icon={notiOn ? faBell : faBellSlash}
            className={notiOn ? 'text-red-500' : 'text-gray-700'}
          />
        </button>

        {/* User dropdown */}
        <div className='relative' ref={boardRef}>
          <button
            onClick={handleToggleBoard}
            className='bg-gray-100 inline-flex items-center gap-2 hover:bg-gray-200 transition rounded-[12px] p-[10px] px-[20px]'
          >
            {/* <--- Avatar and username ---> */}
            <img
              src={user?.avatar || avatarImg}
              alt='avatar'
              className='w-8 h-8 rounded-full object-cover'
            />
            <span className='text-gray-800 text-sm font-medium'>
              {isLoading ? 'Loading...' : user?.userName || 'Tuong'}
            </span>
            <FontAwesomeIcon icon={faAngleDown} className='text-gray-600' />
          </button>

          {/* <--- Dropdown menu ---> */}
          {showBoard && (
            <div className='absolute w-36 right-0 mt-2 bg-white border border-gray-200 rounded-[12px] shadow-lg flex flex-col text-sm'>
              <button className='px-4 py-3 text-left hover:bg-gray-100' onClick={handleViewProfile}>
                View Profile
              </button>
              <button className='px-4 py-3 text-left hover:bg-gray-100' onClick={handleLogout}>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeaderSearch
