// src/pages/Tutor/SessionDetailsPage.tsx

import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import Header from '@/components/HeaderDetail'
import Footer from '@/components/InternalFooter'
import Sidebar from '@/components/Sidebar'

import { useSessionDetail } from '@/hooks/useSessionDetail'
import RegisteredStudentsTable from '@/components/RegisteredStudentsTable'
import ProgressReportBox from '@/components/ProgressReportBox'
import SessionDetailsInfo from '@/components/SessionDetailsInfo'

const SessionDetailsPage = () => {
  const { id } = useParams()
  const sessionId = id || '1'

  const [currentPage, setCurrentPage] = useState(1)
  const [fileName, setFileName] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const location = useLocation()
  const itemsPerPage = 6

  const { sessionInfo, students, totalPages, isLoading, uploadReport, isUploading } = useSessionDetail(
    sessionId,
    currentPage,
    itemsPerPage,
    false
  )

  useEffect(() => {
    if (location.state && location.state.scrollToUpload) {
      const element = document.getElementById('upload-section')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name)
      setSelectedFile(e.target.files[0])
    } else {
      setFileName('')
      setSelectedFile(null)
    }
  }

  const handleUploadClick = () => {
    if (selectedFile) {
      uploadReport(selectedFile)
      setFileName('')
      setSelectedFile(null)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className='min-h-screen flex flex-col bg-white'>
      <Header />
      <div className='flex flex-1'>
        <Sidebar />

        <main className='flex-1 ml-0 xl:ml-[282px] pt-24 p-8 space-y-8'>
          {/* Box 1: Thông tin chi tiết buổi học */}
          <h2 className='text-2xl font-bold text-[#B3261E] mb-4'>Session Details</h2>

          {sessionInfo ? (
            <SessionDetailsInfo details={sessionInfo} />
          ) : (
            <div className='p-6 bg-gray-100 rounded-lg'>Loading info...</div>
          )}

          {/* Box 2: Danh sách sinh viên đăng ký */}
          <h2 className='text-2xl font-bold text-[#B3261E] mb-4'>Registered Students</h2>

          {isLoading ? (
            <div className='p-6 bg-white shadow-md rounded-lg'>Loading students...</div>
          ) : (
            <RegisteredStudentsTable
              students={students}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          {/* Box 3: Báo cáo tiến độ */}
          <div className='relative'>
            <ProgressReportBox id='upload-section' fileName={fileName} onFileChange={handleFileChange} />

            {/* Nút xác nhận Upload */}
            {selectedFile && (
              <div className='mt-2 flex justify-end'>
                <button
                  onClick={handleUploadClick}
                  disabled={isUploading}
                  className={`px-4 py-2 text-white font-semibold rounded transition-colors ${isUploading ? 'bg-gray-400' : 'bg-[#B3261E] hover:bg-red-700'
                    }`}
                >
                  {isUploading ? 'Uploading...' : 'Confirm Upload'}
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default SessionDetailsPage
