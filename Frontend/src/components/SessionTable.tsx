import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  ChevronLeft,
  ChevronRight,
  XCircle,
  MoreVertical,
  MessageCircle,
  Share2
} from 'lucide-react'
import type { RegisteredSession } from '@/types/calender'

interface SessionTableProps {
  sessions: RegisteredSession[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const SessionTable = ({ sessions, currentPage, totalPages, onPageChange }: SessionTableProps) => {
  return (
    <section className='bg-white rounded-lg shadow-md mb-8'>
      <div className='overflow-x-auto rounded-md overflow-y-visible'>
        <table className='w-full text-left text-sm'>
          <thead className='bg-gray-200 text-gray-500 uppercase'>
            <tr>
              <th className='px-6 py-3'>Date</th>
              <th className='px-6 py-3'>Time</th>
              <th className='px-6 py-3'>Title</th>
              <th className='px-6 py-3'>Room</th>
              <th className='px-6 py-3'>Tutor</th>
              <th className='px-6 py-3 text-center'>Action</th>
            </tr>
          </thead>

          <tbody className='text-gray-700'>
            {sessions.map((session) => (
              <tr key={session.id} className='border-b border-gray-200 hover:bg-gray-50'>
                <td className='px-6 py-4'>{session.date}</td>

                <td className='px-6 py-4'>
                  {session.startTime} - {session.endTime}
                </td>

                <td className='px-6 py-4 font-medium'>{session.title}</td>

                <td className='px-6 py-4'>{session.room}</td>

                <td className='px-6 py-4'>{session.tutorName}</td>

                {/* ACTION MENU */}
                <td className='px-6 py-4'>
                  <div className='flex items-center justify-center'>
                    <Menu as='div' className='inline-block text-left'>
                      <Menu.Button className='text-gray-300 hover:text-[#B3261E] p-1 rounded-full hover:bg-[#FDE8E8]'>
                        <MoreVertical className='w-5 h-5' />
                      </Menu.Button>

                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                      >
                        <Menu.Items className='absolute right-0 mt-2 w-44 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10'>

                          <div className='px-1 py-1'>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${active ? 'bg-[#B3261E] text-white' : 'text-gray-900'}
                                  group flex rounded-md items-center w-full px-2 py-2 text-sm gap-2`}
                                >
                                  <MessageCircle className='w-4 h-4' />
                                  Feedback
                                </button>
                              )}
                            </Menu.Item>

                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${active ? 'bg-[#B3261E] text-white' : 'text-gray-900'}
                                  group flex rounded-md items-center w-full px-2 py-2 text-sm gap-2`}
                                >
                                  <Share2 className='w-4 h-4' />
                                  Share
                                </button>
                              )}
                            </Menu.Item>
                          </div>

                          <div className='px-1 py-1'>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${active ? 'bg-[#B3261E] text-white' : 'text-red-700'}
                                  group flex rounded-md items-center w-full px-2 py-2 text-sm gap-2`}
                                >
                                  <XCircle className='w-4 h-4' />
                                  Cancel Session
                                </button>
                              )}
                            </Menu.Item>
                          </div>

                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className='flex justify-between items-center p-4 text-sm text-gray-600 bg-gray-100 border-t border-gray-200'>
          <span>
            Page {currentPage} of {totalPages}
          </span>

          <div className='flex items-center gap-1'>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className='px-2 py-1 rounded-md hover:bg-gray-200 disabled:opacity-50'
            >
              <ChevronLeft className='w-4 h-4' />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => onPageChange(i + 1)}
                className={`px-3 py-1 rounded-md ${currentPage === i + 1
                  ? 'bg-red-600 text-white font-bold'
                  : 'hover:bg-gray-200'
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='px-2 py-1 rounded-md hover:bg-gray-200 disabled:opacity-50'
            >
              <ChevronRight className='w-4 h-4' />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default SessionTable
