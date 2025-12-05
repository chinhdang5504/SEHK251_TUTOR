// src/pages/AfterLogin.tsx
import { useCurrentUser } from '@/hooks/useUser'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/slices/userSlice'
import Cookies from 'js-cookie'

const AfterLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: user, isLoading, isError } = useCurrentUser()

  useEffect(() => {
    if (user) {
      const token = Cookies.get('TOKEN') || ''
      dispatch(
        login({
          fullName: user.fullName,
          username: user.email,
          token: token,
          role: user.role
        })
      )

      // Navigate dựa trên role
      switch (user.role) {
        case 'TUTOR':
          navigate('/tutor/dashboard')
          break
        case 'STUDENT':
          navigate('/student/dashboard')
          break
        default:
          navigate('/')
      }
    }
  }, [user, navigate, dispatch])

  if (isLoading) return <div>Loading...</div>

  if (isError)
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <p className='mb-4 text-red-600 font-semibold'>Failed to fetch user info. Please login again.</p>
        <a
          href='http://localhost:8081/sso/login'
          className='bg-[#B3261E] text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors'
        >
          Login
        </a>
      </div>
    )

  return null
}

export default AfterLogin
