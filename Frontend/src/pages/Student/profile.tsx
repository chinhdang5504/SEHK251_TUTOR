import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer'
import avatarImg from '@/assets/image/avatar.png'

import { useUserProfile } from '@/hooks/useUserProfile'
import { useFaculty } from '@/hooks/useFaculty'
import { mockUser } from '@/mocks/user.mock'
import { mockFaculty } from '@/mocks/faculty.mock'

// Interfaces
interface SupportPreferences {
  subject: string
  tutor: string
  preferredFaculty: string
  description: string
}

interface User {
  fullName: string
  userName: string
  role: string 
  email: string
  studentId?: string
  tutorId?: string
  faculty: string
  sex: string
  identificationNumber: string
  dateOfBirth: string
  avatar: string
  supportPreferences?: SupportPreferences
}

interface Faculty {
  id: string
  name: string
}

interface TutorProfileContentProps {
  useApi?: boolean
}

const TutorProfileContent = ({ useApi = false }: TutorProfileContentProps) => {
  const navigate = useNavigate()

  const { data: userData, isLoading: userLoading } = useUserProfile(useApi)
  const { data: facultiesData = mockFaculty, isLoading: facultiesLoading } = useFaculty(useApi)

  const [tutorData, setTutorData] = useState<User>(mockUser)
  const [preferences, setPreferences] = useState<SupportPreferences | null>(
    mockUser.supportPreferences ?? null
  )
  const [facultyOpen, setFacultyOpen] = useState(false)

  useEffect(() => {
    if (!userData) return

    // Check role
    const role = userData.role === 'student' ? 'student' : 'tutor'

    setTutorData({ ...mockUser, ...userData, role })

    // Set supportPreferences if role is student
    if (role === 'student') {
      setPreferences(userData.supportPreferences ?? mockUser.supportPreferences ?? null)
    } else {
      setPreferences(null)
    }
  }, [userData])

  if (userLoading || !tutorData)
    return <p className="text-center mt-20 text-gray-500">Loading profile...</p>

  const isStudent = tutorData.role === 'student'

  return (
    <main className="container mx-auto px-6 py-8 mt-[80px] bg-white rounded-lg flex gap-8">
      {/* Left Sidebar */}
      <aside className="w-[280px] flex-shrink-0 sticky top-[100px] self-start">
        <div className="p-6 flex flex-col items-center border rounded relative">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="absolute left-3 top-3 text-gray-600 hover:text-gray-900"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>

          <div className="flex justify-center mt-8">
            <img
              src={tutorData.avatar || avatarImg}
              alt="avatar"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold mt-4">{tutorData.fullName}</h2>
          <p className="text-sm text-gray-500 mt-1 text-center">{tutorData.email}</p>
        </div>
      </aside>

      {/* Right Content */}
      <section className="flex-1 overflow-y-auto pb-12 pr-4">
        <div className="space-y-6">
          {/* Personal Info */}
          <div className="p-6 border rounded bg-gray-100 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Personal Information</h2>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-semibold">Fullname:</label>
                  <p className="mt-1">{tutorData.fullName}</p>
                </div>

                {isStudent && (
                  <div>
                    <label className="text-sm font-semibold">Student ID:</label>
                    <p className="mt-1">{tutorData.studentId ?? '-'}</p>
                  </div>
                )}

                {!isStudent && (
                  <div>
                    <label className="text-sm font-semibold">Tutor ID:</label>
                    <p className="mt-1">{tutorData.tutorId ?? '-'}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold">Faculty:</label>
                  <p className="mt-1">{tutorData.faculty}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold">Sex:</label>
                  <p className="mt-1">{tutorData.sex}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold">Identification number:</label>
                  <p className="mt-1">{tutorData.identificationNumber}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold">Day of birth:</label>
                  <p className="mt-1">{tutorData.dateOfBirth}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Student-only Sections */}
          {isStudent && preferences && (
            <>
              {/* Support Preferences */}
              <div className="p-6 border rounded bg-gray-100 shadow-sm">
                <h2 className="text-xl font-bold mb-6">Support Preferences</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Subject</label>
                      <input
                        type="text"
                        value={preferences.subject}
                        onChange={(e) =>
                          setPreferences({ ...preferences, subject: e.target.value })
                        }
                        placeholder="Enter subject"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Tutor</label>
                      <input
                        type="text"
                        value={preferences.tutor}
                        onChange={(e) =>
                          setPreferences({ ...preferences, tutor: e.target.value })
                        }
                        placeholder="Enter tutor name"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Preferred Faculty</label>
                    {facultiesLoading ? (
                      <p className="text-gray-500 text-sm">Loading faculties...</p>
                    ) : (
                      <div className="relative">
                        <div
                          className="border border-gray-300 rounded px-3 py-2 cursor-pointer bg-white focus:ring-2 focus:ring-gray-200"
                          onClick={() => setFacultyOpen(!facultyOpen)}
                        >
                          {facultiesData.find((f: Faculty) => f.id === preferences.preferredFaculty)?.name ||
                            'Click here to select faculty...'}
                        </div>

                        {facultyOpen && (
                          <div className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full shadow-md max-h-60 overflow-y-auto">
                            {facultiesData.map((f: Faculty) => (
                              <div
                                key={f.id}
                                className="px-3 py-2 hover:text-black cursor-pointer hover:bg-gray-100"
                                onClick={() => {
                                  setPreferences({ ...preferences, preferredFaculty: f.id })
                                  setFacultyOpen(false)
                                }}
                              >
                                {f.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <textarea
                      value={preferences.description}
                      onChange={(e) =>
                        setPreferences({ ...preferences, description: e.target.value })
                      }
                      placeholder="Enter description"
                      rows={4}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button variant="outline" onClick={() => console.log('Save', preferences)}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>

              {/* Apply for Tutoring */}
              <div className="p-6 border rounded bg-gray-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Apply for tutoring</h3>
                  <Button onClick={() => console.log('Apply')} variant="outline">
                    Get it now
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

// Profile Page
const Profile = () => (
  <div className="flex flex-col min-h-screen bg-white">
    <Header />
    <div className="flex flex-1">
      <TutorProfileContent useApi={true} /> {/* set true to call API */}
    </div>
    <Footer />
  </div>
)

export default Profile
