// src/pages/Tutor/components/SessionDetailsInfo.tsx


interface SessionDetailsInfoProps {
  details: SessionDetailInfo
}

const SessionDetailsInfo = ({ details }: SessionDetailsInfoProps) => {
  return (
    <section className='bg-gray-100 rounded-lg shadow-md p-6'>
      <div className='flex items-center gap-6'>
        <div className='text-center'>
          <div className='text-7xl font-bold text-[#B3261E]'>{details.day}</div>
          <div className='text-base font-semibold text-[#B3261E] mt-1'>{details.monthYear}</div>
        </div>

        <div className='w-px bg-gray-300 h-24'></div>

        <div className='flex-1 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 text-sm'>
          <div>
            <label className='text-xs text-[#B3261E] font-bold uppercase'>SUBJECT</label>
            <p className='text-sm font-semibold text-gray-800'>{details.subject}</p>
          </div>
          <div>
            <label className='text-xs text-[#B3261E] font-bold uppercase'>TUTOR</label>
            <p className='text-sm font-semibold text-gray-800'>{details.tutor}</p>
          </div>
          <div></div>

          <div>
            <label className='text-xs text-[#B3261E] font-bold uppercase'>TIME</label>
            <p className='text-sm font-semibold text-gray-800'>{details.time}</p>
          </div>
          <div>
            <label className='text-xs text-[#B3261E] font-bold uppercase'>ROOM</label>
            <p className='text-sm font-semibold text-gray-800'>{details.room}</p>
          </div>
          <div>
            <label className='text-xs text-[#B3261E] font-bold uppercase'>NUMBER OF STUDENTS</label>
            <p className='text-sm font-semibold text-gray-800'>{details.studentCount}</p>
          </div>
          <div>
            <label className='text-xs text-[#B3261E] font-bold uppercase'>STATUS</label>
            <p className='text-sm font-semibold text-yellow-600'>{details.status}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SessionDetailsInfo
