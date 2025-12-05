import { useState } from 'react'
import Header from '@/components/HeaderDetail'
import Footer from '@/components/InternalFooter'
import Sidebar from '@/components/Sidebar'
import SessionsTable from '@/components/SessionTableTutor'
import { useTutorDashboard } from '@/hooks/useTutorDashboard'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { createSession, type CreateSessionData } from '@/api/tutorApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

const MySessionsPage = () => {
  const queryClient = useQueryClient()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { sessions, totalPages, isLoading } = useTutorDashboard(currentPage, itemsPerPage)

  const [formData, setFormData] = useState<CreateSessionData>({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    room: '',
    capacity: 30
  })

  const createSessionMutation = useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutor-sessions'] })
      setIsModalOpen(false)
      resetForm()
      toast.success('Session created successfully!')
    },
    onError: () => {
      toast.error('Failed to create session')
    }
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'capacity' ? parseInt(value) || 0 : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createSessionMutation.mutate(formData)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      room: '',
      capacity: 30
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    resetForm()
  }

  return (
    <div className='min-h-screen flex flex-col bg-white'>
      <Header />
      <div className='flex flex-1'>
        <Sidebar />

        <main className='flex-1 ml-0 xl:ml-[282px] pt-24 p-8'>
          {/* Header with Create Button */}
          <div className='flex justify-between items-center mb-6'>
            <div className='flex justify-between items-center mb-4'>
              <h1 className='text-3xl font-bold text-[#B3261E]'>My sessions</h1>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className='flex items-center gap-2'>
                  <Plus className='w-4 h-4' />
                  Create Session
                </Button>
              </DialogTrigger>
              <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
                <DialogHeader>
                  <DialogTitle className='text-2xl'>Create New Session</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to create a new tutoring session.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className='space-y-4'>
                  {/* Title */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Title <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      name='title'
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder='e.g., Advanced Calculus Session'
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Description <span className='text-red-500'>*</span>
                    </label>
                    <textarea
                      name='description'
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder='Describe the session content...'
                    />
                  </div>

                  {/* Date and Time */}
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Date <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='date'
                        name='date'
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Start Time <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='time'
                        name='startTime'
                        value={formData.startTime}
                        onChange={handleInputChange}
                        required
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        End Time <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='time'
                        name='endTime'
                        value={formData.endTime}
                        onChange={handleInputChange}
                        required
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      />
                    </div>
                  </div>

                  {/* Room and Capacity */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Room <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        name='room'
                        value={formData.room}
                        onChange={handleInputChange}
                        required
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='e.g., Room-101'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Capacity <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='number'
                        name='capacity'
                        value={formData.capacity}
                        onChange={handleInputChange}
                        required
                        min='1'
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='30'
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type='button' onClick={handleCancel} variant='outline'>
                      Cancel
                    </Button>
                    <Button type='submit' disabled={createSessionMutation.isPending}>
                      {createSessionMutation.isPending ? 'Creating...' : 'Create Session'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className='flex flex-col lg:flex-row gap-8'>
            {isLoading ? (
              <div className='flex-1 p-10 text-center text-gray-500'>Loading dashboard...</div>
            ) : (
              <SessionsTable
                sessions={sessions}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default MySessionsPage