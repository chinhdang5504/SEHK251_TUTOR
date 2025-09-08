import { Button } from '@/components/ui/button'
import { SSO_URL } from '@/utils/constant'

const LandingPage = () => {
  const handleClick = () => {
    window.location.href = SSO_URL
  }

  return (
    <div className='border-8 border-pink-400 h-screen flex flex-col items-center justify-center font-bold gap-8'>
      <h1 className='text-4xl '>LandingPage</h1>
      <Button onClick={handleClick} size='lg'>
        Login
      </Button>
    </div>
  )
}

export default LandingPage
