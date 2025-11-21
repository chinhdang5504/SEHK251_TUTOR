// src/pages/Student/components/SessionTable.tsx
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faTimesCircle,
  faEllipsisV,
  faComments,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { Menu, Transition } from '@headlessui/react';
import type { RegisteredSession } from '@/pages/Student/Dashboard/dashboard.types.ts';

interface SessionTableProps {
  sessions: RegisteredSession[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const SessionTable = ({ sessions, currentPage, totalPages, onPageChange }: SessionTableProps) => {
  return (
    <section className="bg-white rounded-lg shadow-md mb-8">
      <div className="overflow-x-auto rounded-md overflow-y-visible">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-200 text-gray-500 uppercase">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Subject</th>
              <th className="px-6 py-3">Room</th>
              <th className="px-6 py-3">Tutor</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {sessions.map((session) => (
              <tr key={session.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4">{session.date}</td>
                <td className="px-6 py-4">{session.time}</td>
                <td className="px-6 py-4 font-medium">{session.subject}</td>
                <td className="px-6 py-4">{session.room}</td>
                <td className="px-6 py-4">{session.tutor}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <Menu as="div" className="inline-block text-left">
                      <Menu.Button className="text-gray-300 hover:text-[#B3261E] p-1 rounded-full hover:bg-[#B3261E]-200">
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-45 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                          <div className="px-1 py-1 ">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active ? 'bg-[#B3261E] text-white' : 'text-gray-900'
                                  } group flex rounded-md items-center w-full px-2 py-2 text-sm gap-2`}
                                >
                                  <FontAwesomeIcon icon={faComments} className="w-4" />
                                  Feedback
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active ? 'bg-[#B3261E] text-white' : 'text-gray-900'
                                  } group flex rounded-md items-center w-full px-2 py-2 text-sm gap-2`}
                                >
                                  <FontAwesomeIcon icon={faShare} className="w-4" />
                                  Share
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                          <div className="px-1 py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active ? 'bg-[#B3261E] text-white' : 'text-red-700'
                                  } group flex rounded-md items-center w-full px-2 py-2 text-sm gap-2`}
                                >
                                  <FontAwesomeIcon icon={faTimesCircle} className="w-4" />
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

        <div className="flex justify-between items-center p-4 text-sm text-gray-600 bg-gray-100 border-t border-gray-200 ">
          <span>Page {currentPage} of {totalPages}</span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded-md hover:bg-gray-200 disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faChevronLeft} size="xs" />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i} 
                onClick={() => onPageChange(i + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === i + 1 
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
              className="px-2 py-1 rounded-md hover:bg-gray-200 disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faChevronRight} size="xs" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SessionTable;