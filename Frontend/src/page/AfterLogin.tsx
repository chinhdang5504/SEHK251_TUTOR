// src/pages/AfterLogin.tsx
import { useCurrentUser } from '@/hooks/useUser'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AfterLogin = () => {
  const navigate = useNavigate()
  const { data: user, isLoading, isError } = useCurrentUser()

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case 'tutor':
          navigate('/tutor')
          break
        case 'student':
          navigate('/student/dashboard')
          break
        default:
          navigate('/')
      }
    }
  }, [user, navigate])

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
