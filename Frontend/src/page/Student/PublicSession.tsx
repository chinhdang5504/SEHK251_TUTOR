import Header from '@/components/HeaderSearch'
import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { usePublicSessions } from '@/hooks/useGetListSession'
import type { Session } from '@/types/session'
import InternalFooter from '@/components/InternalFooter'

const PublicSessions = () => {
  const { sessions, loading, notFound, fetchData } = usePublicSessions()

  return (
    <div className='min-h-screen flex flex-col bg-white'>
      <Header
        onSearch={fetchData}
        placeholder='Search public sessions by title, tutor, or faculty'
      />

      <div className='flex flex-1'>
        <Sidebar />

        <main className='flex-1 ml-0 xl:ml-[282px] mt-[80px] flex flex-col overflow-y-auto hide-scrollbar h-[calc(100vh-80px)]'>
          <div className='px-5 sm:px-10 lg:pl-[50px] lg:pr-[100px] pb-10'>
            <h1 className='text-lg font-semibold mb-6'>Public sessions</h1>

            {loading ? (
              <div className='text-center text-gray-500 mt-10'>Loading...</div>
            ) : notFound ? (
              <div className='text-center text-gray-600 text-lg font-medium mt-20'>No public sessions found</div>
            ) : (
              <div className='flex flex-col gap-6'>
                {sessions.map((s: Session) => {
                  const slotsLeft = s.maxCapacity - s.currentEnrollment
                  return (
                    <div
                      key={s.id}
                      className='flex flex-col sm:flex-row bg-gray-100 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden'
                    >
                      <div className='flex-1 bg-white px-6 py-5 flex flex-col justify-center'>
                        <div className='flex flex-wrap items-center justify-between mb-3 gap-2'>
                          <div className='flex items-center flex-wrap gap-2'>
                            <span className='bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-lg'>
                              {s.date}
                            </span>
                            <span className='bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-lg'>
                              {slotsLeft} slots
                            </span>
                            <span
                              className='bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-lg truncate max-w-[150px] sm:max-w-[180px] md:max-w-[220px]'
                              title={s.room}
                            >
                              {s.room}
                            </span>
                          </div>

                          <span className='text-sm text-gray-600 font-medium'>By {s.tutorName}</span>
                        </div>

                        <h2 className='text-base font-semibold text-gray-900 mb-2 line-clamp-1'>{s.title}</h2>

                        <p className='text-sm text-gray-700 line-clamp-3 mb-3'>{s.description}</p>

                        <div className='flex justify-end gap-3'>
                          <Button variant='outline' className='w-[100px] h-[36px] text-sm'>
                            Details
                          </Button>
                          <Button
                            variant='outline'
                            disabled={s.enrolled || slotsLeft <= 0}
                            className='w-[100px] h-[36px] text-sm'
                          >
                            {s.enrolled ? 'Enrolled' : slotsLeft <= 0 ? 'Full' : 'Enroll'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </main>
      </div>

      <InternalFooter />
    </div>
  )
}

export default PublicSessions
