// src/hooks/useFeedbackModal.ts
import { useState } from 'react'

export interface Student {
  id: string
  name: string
  status: 'active' | 'inactive' | 'pending' | string
  tutorName?: string
}

interface SessionForFeedback {
  id: string
  title: string
  tutorName: string
}

export const useFeedbackModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const openFeedbackModal = (student: Student) => {
    setSelectedStudent(student)
    setIsOpen(true)
  }

  const closeFeedbackModal = () => {
    setIsOpen(false)
    setSelectedStudent(null)
  }

  const handleFeedbackSubmit = (sessionId: string, rating: number, comments: string) => {
    console.log(
      `[Hook Log] Submit Feedback -> Student: ${selectedStudent?.name}, SessionID: ${sessionId}, Rating: ${rating}, Comments: ${comments}`
    )
    closeFeedbackModal()
  }

  const studentAsSession: SessionForFeedback[] = selectedStudent
    ? [
        {
          id: selectedStudent.id,
          title: `Feedback for ${selectedStudent.name}`,
          tutorName: selectedStudent.tutorName || 'N/A'
        }
      ]
    : []

  return {
    isOpen,
    selectedStudent,
    studentAsSession,
    openFeedbackModal,
    closeFeedbackModal,
    handleFeedbackSubmit
  }
}
