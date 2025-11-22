import { NavLink, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import StatusBadge from './StatusBadge'
import type { Session } from '@/types/session'

interface SessionsTableProps {
  sessions: Session[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const SessionsTable = ({ sessions, currentPage, totalPages, onPageChange }: SessionsTableProps) => {
  const navigate = useNavigate()

  const handleUploadClick = () => {
    navigate('/tutor/session-detail', { state: { scrollToUpload: true } })
  }

  return (
    <div className='flex-1'>
      {/* Tiêu đề */}
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-3xl font-bold text-[#B3261E]'>My sessions</h1>
      </div>

      {/* Bảng dữ liệu */}
      <div className='bg-white shadow-md rounded-lg overflow-x-auto'>
        <table className='w-full min-w-[700px] text-left text-sm'>
          <thead className='bg-gray-200 text-gray-500 uppercase'>
            <tr>
              <th className='px-6 py-3'>Date</th>
              <th className='px-6 py-3'>Time</th>
              <th className='px-6 py-3'>Title</th>
              <th className='px-6 py-3'>Room</th>
              <th className='px-6 py-3'>Status</th>
              <th className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {sessions.map((session) => (
              <tr key={session.id} className='border-b border-gray-200 hover:bg-gray-50'>
                <td className='px-6 py-4'>{session.date}</td>
                <td className='px-6 py-4'>{`${session.startTime} - ${session.endTime}`}</td>
                <td className='px-6 py-4 font-medium'>{session.title}</td>
                <td className='px-6 py-4'>{session.room}</td>
                <td className='px-6 py-4'>
                  <StatusBadge status={session.status} />
                </td>
                <td className='px-6 py-4 flex gap-2'>
                  <NavLink
                    to={`/tutor/session-detail/${session.id}`}
                    className='text-red-600 border border-red-500 rounded-full px-3 py-1 text-xs font-medium hover:bg-red-50'
                  >
                    Details
                  </NavLink>

                  <button
                    onClick={handleUploadClick}
                    className='text-red-600 border border-red-500 rounded-full px-3 py-1 text-xs font-medium hover:bg-red-50'
                  >
                    Upload Minutes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className='flex justify-between items-center mt-4 text-sm text-gray-600'>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className='flex items-center gap-1'>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='px-2 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50'
          >
            <ChevronLeft size={16} />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-red-600 text-white font-bold' : 'hover:bg-gray-100'}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='px-2 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50'
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SessionsTable
