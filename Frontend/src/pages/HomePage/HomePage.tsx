// src/pages/TestPage/TestPage.tsx

// =================================================================
// 1. IMPORTS
// =================================================================
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faArrowRight,
  faEnvelope,
  faPhone,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logoImg from '@/assets/image/logo.png'
import background from '@/assets/image/HomePage/background-homepage.png'
import help from '@/assets/image/HomePage/help.png'
import Ses1 from '@/assets/image/HomePage/Recent-ses/ses1.png'
import Ses2 from '@/assets/image/HomePage/Recent-ses/ses2.png'
import Ses3 from '@/assets/image/HomePage/Recent-ses/ses3.png'
import Ses4 from '@/assets/image/HomePage/Recent-ses/ses4.png' 
import Ses5 from '@/assets/image/HomePage/Recent-ses/ses5.png' 
import Ses6 from '@/assets/image/HomePage/Recent-ses/ses6.png' 
// =================================================================
// 2. COMPONENT: Header
// =================================================================

const Header = () => {
const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? 'bg-gray-300 text-gray-900'
        : 'text-gray-600 hover:bg-gray-200'
    }`

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 h-20 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-2">
          
          <img 
            src={logoImg} 
            alt="HCMUT Tutor Logo" 
            className="h-15" 
          />

        </NavLink>

        <div className="hidden md:flex items-center gap-4 text-2xl font-medium ">
          <NavLink to="/" className={getNavLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/session" className={getNavLinkClass}>
            Session
          </NavLink>
          <NavLink to="/tutor" className={getNavLinkClass}>
            Tutor
          </NavLink>
          <NavLink to="/contact" className={getNavLinkClass}>
            Contact
          </NavLink>
        </div>

        <div className="flex items-center">
          <NavLink
            to="/login"
            className="bg-[#B3261E] text-white px-5 py-2 rounded-lg font-semibold text-2xl hover:bg-[#9e1f18] transition-colors"
          >
            Sign in
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

// =================================================================
// 3. COMPONENT CON: SessionCard
// =================================================================
interface SessionCardProps {
  imgSrc: string
  title: string
  author: string
  description: string
  date: string
  slots: string
  className?: string
}

const SessionCard = ({
  imgSrc,
  title,
  author,
  description,
  date,
  slots,
  className,
}: SessionCardProps) => {
return (
    <div
      className={`bg-gray-100 rounded-lg shadow-md border border-gray-200 overflow-hidden h-full flex flex-col relative w-full ${className}`}
    >
      {/* 1. Phần hình ảnh */}
      <img src={imgSrc} alt={title} className=" p-6 w-full h-80 object-cover rounded-xl" />

      {/* 2. Phần nội dung */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* Hàng trên cùng (Date/Slots/Author) */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          {/* Date và Slots */}
          <div className="flex gap-2">
            <span className="bg-white text-gray-900 text-s px-3.5 py-1.5 rounded-md">
              {date}
            </span>
            <span className="bg-white text-gray-900 text-s px-3.5 py-1.5 rounded-md">
              {slots}
            </span>
          </div>
          {/* Tác giả */}
          <span className="text-[#262626] text-s font-semibold">{author}</span>
        </div>

        {/* Tiêu đề */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

        {/* Mô tả */}
        <p className="text-gray-600 text-sm mb-4 h-16">{description}</p>
        
        <div className="mt-auto py-3"> 
          {/* Nút (Button) */}
          <button className="w-full border border-[#B3261E] text-[#B3261E] px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-50 transition-colors">
            Get it now
          </button>
        </div>
      </div>
    </div>
  );
};

// =================================================================
// 4. COMPONENT CON: Footer 
// =================================================================
const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 pt-12">
      <div className="container mx-auto px-4">
        {/* Phần trên: 3 cột */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-15 mb-8">
          
          {/* Cột 1: Contact */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-lg">
              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faEnvelope} />
                <span>hcmuttutor@hcmut.edu.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faPhone} />
                <span>+91 91813 23 2309</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faLocationDot} className="mt-1" />
                <div>
                  <span>Cơ sở 1: 268 Lý Thường Kiệt, Phường Diên Hồng, TP HCM</span>
                  <a href="https://maps.app.goo.gl/PqHZDoWCxapEeV6r5" className="text-blue-400 hover:underline ml-1">(Bản đồ)</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faLocationDot} className="mt-1" />
                <div>
                  <span>Cơ sở 2: Khu phố Tân Lập, Phường Đông Hòa, TP HCM</span>
                  <a href="https://maps.app.goo.gl/g9wei3mchw71scfX9" className="text-blue-400 hover:underline ml-1">(Bản đồ)</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Cột 2: About us */}
          <div className="pl-55">
            <h3 className="text-xl font-bold text-white mb-4">About us</h3>
            <ul className="space-y-3 text-lg">
              <li><a href="#" className="hover:text-white transition-colors">Achievements</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Goals</a></li>
            </ul>
          </div>

          {/* Cột 3: Visitors */}
          <div className="md:text-right">
            <h3 className="text-xl font-bold text-white mb-4">Number of visitors: 5,000</h3>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        {/* Social Icons */}
        <div className="flex justify-center gap-7 mb-6">
          <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-white transition-colors">
            <FontAwesomeIcon icon={faFacebookF} size="2xl" />
          </a>
          <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-white transition-colors">
            <FontAwesomeIcon icon={faInstagram} size="2xl" />
          </a>
          <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-white transition-colors">
            <FontAwesomeIcon icon={faTwitter} size="2xl" />
          </a>
          <a href="#" aria-label="LinkedIn" className="text-gray-300 hover:text-white transition-colors">
            <FontAwesomeIcon icon={faLinkedinIn} size="2xl" />
          </a>
        </div>

        {/* Links phụ */}
        <div className="flex flex-wrap justify-center gap-x-24 gap-y-2 text-xl text-gray-400 mb-8">
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors">Contact us</a>
          <a href="#" className="hover:text-white transition-colors">FAQS</a>
          <a href="#" className="hover:text-white transition-colors">Terms and conditions</a>
          <a href="#" className="hover:text-white transition-colors">Cookie policy</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-white pb-8">
          Copyright © 2025 – HCMUT TUTOR
        </div>

      </div>
    </footer>
  );
}
// =================================================================
// 4. COMPONENT CHÍNH
// =================================================================
// Mock
const allSessions = [
  { imgSrc: Ses1, title: "Entrepreneurship and Innovation", author: "By Le Hieu Son", description: "Learn the basic concepts of engineering and explore how different branches apply scientific principles to practical solutions. Gain an overview of the engineering design process and its role in addressing real-world challenges.", date: "3.12.2025", slots: "50 slots" },
  { imgSrc: Ses2, title: "Machine Learning", author: "By Nguyen Huy Hoai", description: "Understand the basic concepts...", date: "15.01.2026", slots: "55 slots" },
  { imgSrc: Ses3, title: "Advanced Data Structures", author: "By Tran Van A", description: "Deep dive into advanced data structures...", date: "01.03.2025", slots: "40 slots" },
  { imgSrc: Ses4, title: "Entrepreneurship and Innovation", author: "By Le Hieu Son", description: "Learn the basic concepts of engineering and explore how different branches apply scientific principles to practical solutions. Gain an overview of the engineering design process and its role in addressing real-world challenges.", date: "3.12.2025", slots: "50 slots" },
  { imgSrc: Ses5, title: "Machine Learning", author: "By Nguyen Huy Hoai", description: "Understand the basic concepts...", date: "15.01.2026", slots: "55 slots" },
  { imgSrc: Ses6, title: "Advanced Data Structures", author: "By Tran Van A", description: "Deep dive into advanced data structures...", date: "01.03.2025", slots: "40 slots" },
  { imgSrc: Ses4, title: "Entrepreneurship and Innovation", author: "By Le Hieu Son", description: "Learn the basic concepts of engineering and explore how different branches apply scientific principles to practical solutions. Gain an overview of the engineering design process and its role in addressing real-world challenges.", date: "3.12.2025", slots: "50 slots" },
  { imgSrc: Ses5, title: "Machine Learning", author: "By Nguyen Huy Hoai", description: "Understand the basic concepts...", date: "15.01.2026", slots: "55 slots" },
  { imgSrc: Ses6, title: "Advanced Data Structures", author: "By Tran Van A", description: "Deep dive into advanced data structures...", date: "01.03.2025", slots: "40 slots" },
]

const TestPage = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [showAll, setShowAll] = useState(false);
  const sessionsPerPage = 2 
  const totalPages = Math.ceil(allSessions.length / sessionsPerPage) 

  const currentSessions = allSessions.slice(
    currentPage * sessionsPerPage,
    (currentPage + 1) * sessionsPerPage
  )
  return (
    <div className="bg-white">
      <Header />

      <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${background})`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-30 backdrop-blur-sm"></div> 
        </div>

        <div className="relative z-10 p-4">
          <div className="bg-white rounded-xl py-4 px-110 shadow-lg max-w-xl mx-auto flex items-center justify-center">
            <div className="absolute top-0 left-0 -translate-x-full -translate-y-full w-1 h-9 bg-white rounded-full rotate-[-45deg] transform origin-bottom-left" style={{ marginLeft: '1rem', marginTop: '1rem' }}></div>
            <div className="absolute top-0 left-0 -translate-x-full -translate-y-full w-1 h-6 bg-white rounded-full rotate 0 transform origin-bottom-left" style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}></div>
            <div className="absolute top-0 left-0 -translate-x-full -translate-y-full w-1 h-6 bg-white rounded-full rotate-[-90deg] transform origin-bottom-left" style={{ marginLeft: '0.8rem', marginTop: '1.9rem' }}></div>
            <FontAwesomeIcon
              icon={faSearch}
              className="bg-[#B3261E] text-white text-5xl mr-3 rounded-lg p-2" 
            />
            <h1 className="text-5xl font-bold text-gray-900 whitespace-nowrap">
              <span className="text-[#B3261E]">Find</span> Your Future Today!
            </h1>
          </div>

          <p className="text-4xl mt-6 font-normal text-white">
            The Ultimate Guide to University Learning
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">          
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Recent sessions
            <div className="w-20 h-1.5 bg-[#B3261E] rounded-full mx-auto mt-2"></div>
          </h2>

            <div className={`grid grid-cols-1 md:grid-cols-2 ${showAll ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8`}>
              {(showAll ? allSessions : currentSessions).map((session, index) => (
                <SessionCard
                  key={index}
                  imgSrc={session.imgSrc}
                  title={session.title}
                  author={session.author}
                  description={session.description}
                  date={session.date}
                  slots={session.slots}
                />
              ))}
            </div>

          <div className="text-center mt-10">
            {!showAll && (
            <div className="flex justify-center gap-2 mb-4">
              {[...Array(totalPages)].map((_, index) => (
                <span
                  key={index}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                    currentPage === index ? 'bg-red-600' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setCurrentPage(index)} 
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
            )}
            <a 
              href="#" 
              className="text-red-600 font-semibold hover:underline"
              onClick={(e) => {
                e.preventDefault();
                setShowAll(!showAll);
              }}
            >
              {showAll ? 'SHOW LESS' : 'SEE ALL'}
              <FontAwesomeIcon icon={faArrowRight} size="sm" className="ml-1" />
            </a>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <hr className="border-t-[3px] border-[#B3261E]" />
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src={help}
              alt="Help"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="p-4">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              We're here to help
            </h2>
            <p className="text-gray-600 mb-6">
              Read through our FAQs and, if you can't find the answer, one of our
              support staff will be happy to answer your questions.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#B3261E] text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors">
                READ FAQS
              </button>
              <button className="border border-[#B3261E] text-[#B3261E] px-6 py-2 rounded-md font-semibold hover:bg-red-50 transition-colors">
                <FontAwesomeIcon icon={faEnvelope} size="sm" /> ASK A QUESTION
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default TestPage