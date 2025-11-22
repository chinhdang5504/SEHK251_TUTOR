import { useParams } from 'react-router-dom'
import Header from '@/components/HeaderDetail'
import Sidebar from '@/components/Sidebar'
import TutorCalendar from '@/components/TutorCalendar'
import { Button } from '@/components/ui/button'
import { useTutorInfo } from '@/hooks/useTutorInfo'
import InternalFooter from '@/components/InternalFooter'
import { useEnrollSession } from '@/hooks/useEnrollSession'
import { useCancelSession } from '@/hooks/useCancelSession'
import type { Session } from '@/types/session'

const TutorInfo = () => {
  const { id } = useParams<{ id: string }>()
  const { tutor, tutorLoading, classes, classesLoading, handleDateSelect } = useTutorInfo(id)

  const enrollMutation = useEnrollSession()
  const cancelMutation = useCancelSession()
  if (tutorLoading || classesLoading)
    return <div className='text-center mt-10 text-gray-500'>Loading tutor information...</div>

  if (!tutor)
    return <div className='text-center mt-10 text-gray-600 font-medium'>Tutor not found</div>

  const handleEnroll = async (clsId: string) => {
    try {
      await enrollMutation.mutateAsync(clsId)
    } catch (err) {
      console.error(err)
    }
  }

  const handleCancel = async (clsId: string) => {
    try {
      await cancelMutation.mutateAsync(clsId)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='min-h-screen flex flex-col bg-white'>
      <Header />
      <div className='flex flex-1 relative'>
        <Sidebar />

        <main className='flex-1 overflow-y-auto hide-scrollbar p-6 flex flex-col gap-6 mt-[50px] ml-0 xl:ml-[282px] mr-72'>
          {/* Tutor Info */}
          <div className='border p-4 rounded-[12px]'>
            <h2 className='font-semibold text-gray-700 mb-2 text-lg'>Tutor Information</h2>
            <div className='flex items-start gap-12'>
              <img src={tutor.avatar} alt={tutor.fullName} className='w-36 h-36 rounded-[2px] object-cover' />
              <div className='flex-1 space-y-2 text-sm'>
                <p><strong>Name:</strong> {tutor.fullName}</p>
                <p><strong>Faculty:</strong> {tutor.faculty}</p>
                <p><strong>Email:</strong> {tutor.email}</p>
                <p><strong>Phone:</strong> {tutor.phone}</p>
                <p><strong>Bio:</strong> {tutor.bio}</p>
              </div>
            </div>
          </div>

          {/* Current Sessions */}
          <div className='border p-4 rounded-[12px]'>
            <h2 className='font-semibold text-gray-700 text-lg mb-2'>Current Sessions</h2>
            <table className='w-full text-left'>
              <thead>
                <tr className='bg-gray-100 border-b border-gray-200'>
                  <th className='px-4 py-3'>Date</th>
                  <th className='px-4 py-3'>Title</th>
                  <th className='px-4 py-3'>Slots</th>
                  <th className='px-4 py-3'>Action</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls: Session) => (
                  <tr key={cls.id} className='border-b border-gray-100 hover:bg-gray-50 transition-colors'>
                    <td className='px-4 py-3'>{cls.date}</td>
                    <td className='px-4 py-3'>{cls.title}</td>
                    <td className='px-4 py-3'>{cls.maxCapacity - cls.currentEnrollment} slots</td>
                    <td className='px-4 py-3'>
                      {cls.enrolled ? (
                        <Button
                          size='sm'
                          variant='secondary'
                          onClick={() => handleCancel(cls.id)}
                          disabled={cancelMutation.isPending}
                        >
                          {cancelMutation.isPending ? 'Cancelling...' : 'Cancel'}
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleEnroll(cls.id)}
                          disabled={enrollMutation.isPending || cls.maxCapacity - cls.currentEnrollment === 0}
                        >
                          {enrollMutation.isPending ? 'Enrolling...' : cls.maxCapacity - cls.currentEnrollment === 0 ? 'Full' : 'Enroll'}
                        </Button>

                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Right Sidebar */}
        <div className='w-72 flex-shrink-0 fixed right-0 top-[64px] h-[calc(100vh-50px)] p-4 flex flex-col gap-6'>
          <div className='bg-white rounded-[12px] border border-gray-300 p-4'>
            <TutorCalendar onSelectDate={handleDateSelect} />
          </div>
        </div>
      </div>

      <InternalFooter />
    </div>
  )
}

export default TutorInfo
