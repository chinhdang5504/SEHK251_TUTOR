// src/pages/TestPage/TestPage.tsx

import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';

// Import Assets
import background from '@/assets/image/HomePage/background-homepage.png';
import help from '@/assets/image/HomePage/help.png';

// Import Components
import Header from './component/Header';
import Footer from './component/Footer';
import SessionCard from './component/SessionCard';

// 1. IMPORT HOOK & TYPE
import { useHome } from '@/hooks/useHomepage';
import type { SessionData } from '@/pages/HomePage/homepage.types';

const TestPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const { 
    sessions,           
    isSessionsLoading,  
    enroll              
  } = useHome(false);

  // --- Logic Phân trang ---
  const sessionsPerPage = 2; 

  // Sử dụng dữ liệu từ Hook
  const totalPages = Math.ceil(sessions.length / sessionsPerPage);

  const currentSessions = sessions.slice(
    currentPage * sessionsPerPage,
    (currentPage + 1) * sessionsPerPage
  );

  const handleEnroll = (sessionId: number) => {
    enroll(sessionId);
  };

  return (
    <div className="bg-white">
      <Header />

      <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="absolute inset-0 bg-black opacity-30 backdrop-blur-sm"></div> 
        </div>

        <div className="relative z-10 p-4">
          <div className="bg-white rounded-xl py-4 px-110 shadow-lg max-w-xl mx-auto flex items-center justify-center relative">
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

      {/* --- RECENT SESSIONS SECTION --- */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">          
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Recent sessions
            <div className="w-20 h-1.5 bg-[#B3261E] rounded-full mx-auto mt-2"></div>
          </h2>

          {/* 3. HIỂN THỊ LOADING HOẶC DỮ LIỆU */}
          {isSessionsLoading ? (
            <div className="text-center text-gray-500 text-xl">Loading sessions...</div>
          ) : (
            <>
              <div className={`grid grid-cols-1 md:grid-cols-2 ${showAll ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8`}>
                
                {(showAll ? sessions : currentSessions).map((session: SessionData, index: number) => (
                  <SessionCard
                    key={index}
                    {...session}
                  />
                ))}

              </div>

              {/* Điều khiển phân trang / Xem thêm */}
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
            </>
          )}
        </div>
      </section>

      <div className="container mx-auto px-4">
        <hr className="border-t-[3px] border-[#B3261E]" />
      </div>

      {/* --- HELP SECTION --- */}
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
  );
};

export default TestPage;