// src/components/FeedbackModal.tsx
import React, { useEffect } from 'react'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const FeedbackModal = ({ isOpen, onClose, children }: FeedbackModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black-100 backdrop-blur-md p-4 animation-fade-in'>
      <div className='absolute inset-0' onClick={onClose}></div>
      <div className='relative z-10 w-full max-w-lg bg-transparent rounded-lg shadow-xl animation-scale-up'>
        {children}
      </div>
    </div>
  )
}

export default FeedbackModal
