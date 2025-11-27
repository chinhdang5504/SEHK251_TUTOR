// src/components/FeedbackForm.tsx
import React, { useState } from 'react'
import { ChevronDown, Star, XCircle } from 'lucide-react'

interface SessionForFeedback {
  id: string
  title: string
  tutorName: string
}

interface FeedbackFormProps {
  sessions: SessionForFeedback[]
  defaultSessionId: string
  onFeedbackSubmit: (sessionId: string, rating: number, comments: string) => void
  onClose: () => void
}

const FeedbackForm = ({ sessions, defaultSessionId, onFeedbackSubmit, onClose }: FeedbackFormProps) => {
  const [selectedSessionId, setSelectedSessionId] = useState<string>(defaultSessionId || sessions[0]?.id || '')
  const [rating, setRating] = useState<number>(0)
  const [comments, setComments] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSessionId || rating === 0) {
      alert('Vui lòng chọn phiên học và đánh giá (Rating)!')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      onFeedbackSubmit(selectedSessionId, rating, comments)
    }, 1000)
  }

  return (
    <div className='p-6 bg-white rounded-xl shadow-2xl border border-gray-200 relative'>
      <button
        onClick={onClose}
        className='absolute top-4 right-4 text-gray-500 hover:text-red-600 transition'
        aria-label='Close feedback form'
      >
        <XCircle className='w-6 h-6' />
      </button>

      <h2 className='text-2xl font-bold text-gray-800 mb-2 text-center'>Feedback form</h2>
      <p className='text-gray-600 mb-6 text-center text-sm'>Share your experience with your student.</p>

      <form onSubmit={handleSubmit}>
        <div className='mb-6'>
          <label htmlFor='session' className='block text-md font-medium text-gray-700 mb-2'>
            Student
          </label>
          <div className='relative'>
            <select
              id='session'
              value={selectedSessionId}
              onChange={(e) => setSelectedSessionId(e.target.value)}
              className='block w-full py-2.5 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#B3261E] focus:border-[#B3261E] appearance-none pr-10'
              disabled={isSubmitting}
            >
              {sessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.title} (Tutor: {session.tutorName})
                </option>
              ))}
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <ChevronDown className='w-4 h-4' />
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className='mb-6'>
          <label className='block text-md font-medium text-gray-700 mb-2'>Rating</label>
          <div className='flex space-x-2'>
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <Star
                key={starIndex}
                className={`w-8 h-8 transition-colors ${
                  rating >= starIndex ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                } ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => !isSubmitting && setRating(starIndex)}
              />
            ))}
          </div>
        </div>

        {/* Comments */}
        <div className='mb-8'>
          <label htmlFor='comments' className='block text-md font-medium text-gray-700 mb-2'>
            Comments
          </label>
          <textarea
            id='comments'
            rows={6}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder='Enter your detailed feedback here, including what went well and areas for improvement...'
            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#B3261E] focus:border-[#B3261E] resize-none'
            disabled={isSubmitting}
          />
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#B3261E] hover:bg-[#99221C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B3261E] transition duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit feedback'}
        </button>
      </form>
    </div>
  )
}

export default FeedbackForm
