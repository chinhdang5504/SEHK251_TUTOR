import { Facebook, Instagram, Twitter, Linkedin, Copyright } from 'lucide-react'

const InternalFooter = () => {
  return (
    <footer className='w-full h-[30px] flex flex-col md:flex-row justify-between items-center px-[20px] bg-black text-[#FCFCFD] text-sm border-t border-gray-800'>
      <div className='flex items-center gap-2'>
        <Copyright className='w-4 h-4' />
        <span>Copyright 2025 HCMUT-TUTOR</span>
      </div>

      <div className='flex gap-4'>
        <a
          href='https://facebook.com'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-blue-400 transition-colors'
        >
          <Facebook className='w-5 h-5' />
        </a>
        <a
          href='https://instagram.com'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-pink-400 transition-colors'
        >
          <Instagram className='w-5 h-5' />
        </a>
        <a
          href='https://twitter.com'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-sky-400 transition-colors'
        >
          <Twitter className='w-5 h-5' />
        </a>
        <a
          href='https://linkedin.com'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-blue-500 transition-colors'
        >
          <Linkedin className='w-5 h-5' />
        </a>
      </div>
    </footer>
  )
}

export default InternalFooter
