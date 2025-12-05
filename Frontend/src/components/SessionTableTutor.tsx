import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Upload, X, FileText } from 'lucide-react'
import StatusBadge from './StatusBadge'
import type { Session } from '@/types/session'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { uploadSessionMinutes } from '@/api/tutorApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface SessionsTableProps {
  sessions: Session[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const SessionsTable = ({ sessions, currentPage, totalPages, onPageChange }: SessionsTableProps) => {
  const queryClient = useQueryClient()
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const uploadMutation = useMutation({
    mutationFn: ({ sessionId, file }: { sessionId: number; file: File }) =>
      uploadSessionMinutes(sessionId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutor-sessions'] })
      setIsUploadModalOpen(false)
      setSelectedFile(null)
      setSelectedSessionId(null)
      toast.success('Session minutes uploaded successfully!')
    },
    onError: () => {
      toast.error('Failed to upload session minutes')
    }
  })

  const handleUploadClick = (sessionId: string) => {
    setSelectedSessionId(parseInt(sessionId))
    setIsUploadModalOpen(true)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      setSelectedFile(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      setSelectedFile(files[0])
    }
  }

  const handleUploadSubmit = () => {
    if (selectedFile && selectedSessionId) {
      uploadMutation.mutate({ sessionId: selectedSessionId, file: selectedFile })
    }
  }

  const handleCancel = () => {
    setIsUploadModalOpen(false)
    setSelectedFile(null)
    setSelectedSessionId(null)
  }

  return (
    <div className='flex-1'>
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
                    onClick={() => handleUploadClick(session.id)}
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

      {/* Upload Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>Upload Session Minutes</DialogTitle>
            <DialogDescription>
              Upload the session minutes document for this tutoring session.
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-4'>
            {/* Drag & Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
                }`}
            >
              {selectedFile ? (
                <div className='flex items-center justify-center gap-3'>
                  <FileText className='w-8 h-8 text-blue-500' />
                  <div className='text-left'>
                    <p className='font-medium text-gray-800'>{selectedFile.name}</p>
                    <p className='text-sm text-gray-500'>
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className='ml-auto text-gray-400 hover:text-gray-600'
                  >
                    <X className='w-5 h-5' />
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className='w-12 h-12 mx-auto text-gray-400 mb-3' />
                  <p className='text-gray-600 mb-2'>
                    Drag and drop your file here, or click to browse
                  </p>
                  <p className='text-sm text-gray-500'>Supported formats: PDF, DOC, DOCX</p>
                  <input
                    type='file'
                    onChange={handleFileSelect}
                    accept='.pdf,.doc,.docx'
                    className='hidden'
                    id='file-upload'
                  />
                  <label
                    htmlFor='file-upload'
                    className='inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors'
                  >
                    Browse Files
                  </label>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type='button' onClick={handleCancel} variant='outline'>
              Cancel
            </Button>
            <Button
              type='button'
              onClick={handleUploadSubmit}
              disabled={!selectedFile || uploadMutation.isPending}
            >
              {uploadMutation.isPending ? 'Uploading...' : 'Upload'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SessionsTable
