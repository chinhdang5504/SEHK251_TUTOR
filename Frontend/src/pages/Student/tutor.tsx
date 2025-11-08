import { useState } from 'react'
import Header from '@/components/Header/HeaderSearch'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useTutorSearch } from '@/hooks/useTutorSearch'

// Interfaces
interface Faculty {
  id: string
  name: string
}

interface Tutor {
  id: string
  fullName: string
  avatar: string
  subject: string
  bio: string
  faculty: Faculty
}

const SearchTutor = () => {
  const [query, setQuery] = useState('')
  const { data: tutors, isLoading, isError } = useTutorSearch(query, false)

  const handleSearch = (value: string) => {
    setQuery(value)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        onSearch={handleSearch}
        loading={isLoading}
        notFound={isError}
        placeholder="Search tutor by name, subject or faculty"
      />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 ml-0 xl:ml-[282px] pt-8 px-8 mt-[80px] flex flex-col overflow-y-auto hide-scrollbar h-[calc(100vh-80px)]">
          {isLoading ? (
            <div className="text-center text-gray-500 mt-10">Loading tutor...</div>
          ) : isError ? (
            <div className="text-center text-gray-600 text-lg font-medium mt-20">
              Tutor not found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutors?.map((tutor: Tutor) => (
                <div
                  key={tutor.id}
                  className="bg-white h-[300px] p-5 shadow-lg relative flex flex-col justify-between rounded-xl transition hover:shadow-xl"
                >
                  <Button
                    variant="ghost"
                    className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full"
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </Button>

                  <div className="flex flex-col items-center flex-grow mt-4">
                    <img
                      src={tutor.avatar}
                      alt={tutor.fullName}
                      className="w-16 h-16 object-cover rounded-full mb-3"
                    />
                    <h2 className="text-base font-semibold text-center text-gray-800">
                      {tutor.fullName}
                    </h2>
                    <p className="text-sm text-gray-600 mb-1 text-center line-clamp-1">
                      {tutor.subject} | {tutor.faculty.name}
                    </p>
                    <p className="text-sm text-center mb-3 line-clamp-3 text-gray-700">
                      {tutor.bio}
                    </p>
                  </div>

                  <div className="mt-auto flex justify-center">
                    <Link to={`/student/tutor-info/${tutor.id}`}>
                      <Button variant="outline" className="w-[130px]">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default SearchTutor
