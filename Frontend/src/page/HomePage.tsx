import { Search, Mail } from 'lucide-react'
import background from '@/assets/image/HomePage/background-homepage.png'
import help from '@/assets/image/HomePage/help.png'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const HomePage = () => {
  return (
    <div className='bg-white'>
      <Header />

      <section className='relative h-[60vh] flex items-center justify-center text-center text-white'>
        <div className='absolute inset-0 bg-cover bg-center' style={{ backgroundImage: `url(${background})` }}>
          <div className='absolute inset-0 bg-black opacity-30 backdrop-blur-sm'></div>
        </div>

        <div className='relative z-10 p-4'>
          <div className='bg-white rounded-xl py-4 px-110 shadow-lg max-w-xl mx-auto flex items-center justify-center relative'>
            <div
              className='absolute top-0 left-0 -translate-x-full -translate-y-full w-1 h-9 bg-white rounded-full rotate-[-45deg] transform origin-bottom-left'
              style={{ marginLeft: '1rem', marginTop: '1rem' }}
            ></div>
            <div
              className='absolute top-0 left-0 -translate-x-full -translate-y-full w-1 h-6 bg-white rounded-full rotate 0 transform origin-bottom-left'
              style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}
            ></div>
            <div
              className='absolute top-0 left-0 -translate-x-full -translate-y-full w-1 h-6 bg-white rounded-full rotate-[-90deg] transform origin-bottom-left'
              style={{ marginLeft: '0.8rem', marginTop: '1.9rem' }}
            ></div>

            <Search className='bg-[#B3261E] text-white p-2 rounded-lg w-12 h-12 mr-3' />
            <h1 className='text-5xl font-bold text-gray-900 whitespace-nowrap'>
              <span className='text-[#B3261E]'>Find</span> Your Future Today!
            </h1>
          </div>

          <p className='text-4xl mt-6 font-normal text-white'>The Ultimate Guide to University Learning</p>
        </div>
      </section>

      <div className='container mx-auto px-4'>
        <hr className='border-t-[3px] border-[#B3261E]' />
      </div>

      {/* --- HELP SECTION --- */}
      <section className='py-16'>
        <div className='container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
          <div>
            <img src={help} alt='Help' className='rounded-lg shadow-lg' />
          </div>
          <div className='p-4'>
            <h2 className='text-3xl font-bold mb-4 text-gray-800'>We're here to help</h2>
            <p className='text-gray-600 mb-6'>
              Read through our FAQs and, if you can't find the answer, one of our support staff will be happy to answer
              your questions.
            </p>
            <div className='flex flex-wrap gap-4'>
              <button className='bg-[#B3261E] text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors'>
                READ FAQS
              </button>
              <button className='border border-[#B3261E] text-[#B3261E] px-6 py-2 rounded-md font-semibold hover:bg-red-50 transition-colors flex items-center gap-2'>
                <Mail size={16} /> ASK A QUESTION
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage
