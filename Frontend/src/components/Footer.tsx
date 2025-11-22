import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='bg-black text-gray-300 pt-12'>
      <div className='container mx-auto px-4'>
        {/* Phần trên: 3 cột */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-15 mb-8'>
          {/* Cột 1: Contact */}
          <div>
            <h3 className='text-xl font-bold text-white mb-4'>Contact</h3>
            <ul className='space-y-3 text-lg'>
              <li className='flex items-center gap-3'>
                <Mail size={18} />
                <span>hcmuttutor@hcmut.edu.com</span>
              </li>
              <li className='flex items-center gap-3'>
                <Phone size={18} />
                <span>+91 91813 23 2309</span>
              </li>
              <li className='flex items-start gap-3'>
                <MapPin size={18} className='mt-1' />
                <div>
                  <span>Cơ sở 1: 268 Lý Thường Kiệt, Phường Diên Hồng, TP HCM</span>
                  <a href='https://maps.app.goo.gl/PqHZDoWCxapEeV6r5' className='text-blue-400 hover:underline ml-1'>
                    (Bản đồ)
                  </a>
                </div>
              </li>
              <li className='flex items-start gap-3'>
                <MapPin size={18} className='mt-1' />
                <div>
                  <span>Cơ sở 2: Khu phố Tân Lập, Phường Đông Hòa, TP HCM</span>
                  <a href='https://maps.app.goo.gl/YLape9XuvCGhc27Q8' className='text-blue-400 hover:underline ml-1'>
                    (Bản đồ)
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Cột 2: About us */}
          <div className='pl-55'>
            <h3 className='text-xl font-bold text-white mb-4'>About us</h3>
            <ul className='space-y-3 text-lg'>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Achievements
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-white transition-colors'>
                  Our Goals
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Visitors */}
          <div className='md:text-right'>
            <h3 className='text-xl font-bold text-white mb-4'>Number of visitors: 5,000</h3>
          </div>
        </div>

        <hr className='border-gray-700 my-8' />

        {/* Social Icons */}
        <div className='flex justify-center gap-7 mb-6'>
          <a href='#' className='text-gray-300 hover:text-white transition-colors'>
            <Facebook size={24} />
          </a>
          <a href='#' className='text-gray-300 hover:text-white transition-colors'>
            <Instagram size={24} />
          </a>
          <a href='#' className='text-gray-300 hover:text-white transition-colors'>
            <Twitter size={24} />
          </a>
          <a href='#' className='text-gray-300 hover:text-white transition-colors'>
            <Linkedin size={24} />
          </a>
        </div>

        {/* Copyright */}
        <div className='text-center text-sm text-white pb-8'>Copyright © 2025 – HCMUT TUTOR</div>
      </div>
    </footer>
  )
}

export default Footer
