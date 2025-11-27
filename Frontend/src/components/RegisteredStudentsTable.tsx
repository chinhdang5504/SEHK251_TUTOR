// src/components/RegisteredStudentsTable.tsx
import { NavLink } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import StudentStatusBadge from '@/components/StudentStatusBadge'

import { useFeedbackModal, type Student } from '@/hooks/useFeedbackModal'

import FeedbackModal from './FeedbackModal'
import FeedbackForm from './Feedbackform'

interface StudentsTableProps {
  students: Student[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const RegisteredStudentsTable = ({ students, currentPage, totalPages, onPageChange }: StudentsTableProps) => {
  const { isOpen, selectedStudent, studentAsSession, openFeedbackModal, closeFeedbackModal, handleFeedbackSubmit } =
    useFeedbackModal()

  return (
    <section className='bg-white rounded-lg shadow-md overflow-hidden'>
      {/* Bảng dữ liệu */}
      <div className='overflow-x-auto'>
        <table className='w-full text-left text-sm'>
          <thead className='bg-gray-100 text-gray-500 uppercase border-b border-gray-200'>
            <tr>
              <th className='px-6 py-3 '>Student Name</th>
              <th className='px-6 py-3 text-center'>Status</th>
              <th className='px-6 py-3 text-center'>Action</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {students.map((student) => (
              <tr key={student.id} className='border-b border-gray-200 hover:bg-gray-100'>
                <td className='px-6 py-4 font-medium'>{student.name}</td>
                <td className='px-6 py-4'>
                  <div className='flex justify-center'>
                    <StudentStatusBadge status={student.status} />
                  </div>
                </td>
                <td className='px-6 py-4 flex gap-3 justify-center'>
                  <NavLink
                    to={`/student/profile/${student.id}`}
                    className='text-blue-600 border border-blue-500 rounded-full px-3 py-1 text-xs font-medium hover:bg-blue-50'
                  >
                    View Profile
                  </NavLink>

                  <button
                    onClick={() => openFeedbackModal(student)}
                    className='text-blue-600 border border-blue-500 rounded-full px-3 py-1 text-xs font-medium hover:bg-blue-50'
                  >
                    Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className='flex justify-between items-center p-4 text-sm text-gray-600 bg-gray-50'>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className='flex items-center gap-1'>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='px-2 py-1 rounded-md hover:bg-gray-200 disabled:opacity-50'
          >
            <ChevronLeft size={16} />
          </button>

          <button className='px-3 py-1 rounded-md bg-red-600 text-white font-bold'>{currentPage}</button>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='px-2 py-1 rounded-md hover:bg-gray-200 disabled:opacity-50'
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {isOpen && selectedStudent && (
        <FeedbackModal isOpen={isOpen} onClose={closeFeedbackModal}>
          <FeedbackForm
            sessions={studentAsSession}
            defaultSessionId={selectedStudent.id}
            onFeedbackSubmit={handleFeedbackSubmit}
            onClose={closeFeedbackModal}
          />
        </FeedbackModal>
      )}
    </section>
  )
}

export default RegisteredStudentsTable
