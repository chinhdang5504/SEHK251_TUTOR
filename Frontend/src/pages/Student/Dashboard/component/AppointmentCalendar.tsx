// src/pages/Student/components/AppointmentCalendar.tsx
import type { WeekDay, RegisteredSession } from '../dashboard.types';

interface AppointmentCalendarProps {
  weekDays: WeekDay[];
  allSessions: RegisteredSession[];
  selectedDate: string | null;
  currentCalendarPage: number;
  totalWeeks: number; 
  onDateSelect: (date: string) => void;
  onCalendarPageChange: (page: number) => void;
}

const getAppointmentCount = (date: string, sessions: RegisteredSession[]): number => {
  return sessions.filter(s => s.date === date).length;
};

const AppointmentCalendar = ({
  weekDays,
  allSessions,
  selectedDate,
  currentCalendarPage,
  totalWeeks,
  onDateSelect,
  onCalendarPageChange
}: AppointmentCalendarProps) => {
  return (
    <section className="bg-gray-100 rounded-lg shadow-md p-6 mt-5">
      <div className="grid grid-cols-7 gap-2 text-center">
        {weekDays.map((day) => { 
          const count = getAppointmentCount(day.fullDate, allSessions); 
          const isSelected = selectedDate === day.fullDate;

          return (
            <div 
              key={day.date} 
              onClick={() => onDateSelect(day.fullDate)}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                isSelected
                  ? 'bg-[#B3261E] text-white' 
                  : 'bg-white hover:bg-gray-200'
              }`}
            >
              <div className="text-xs font-semibold uppercase">{day.day}</div>
              <div className="text-2xl font-bold mt-1">{day.date}</div>
              {count > 0 && (
                <div className={`text-xs mt-1 ${
                  isSelected ? 'text-red-100' : 'text-gray-500'
                }`}>
                  {count} Appointment{count > 1 ? 's' : ''}
                </div>
              )}
            </div>
          )
        })}
      </div>
      
      {/* Dot Navigation */}
      <div className="flex justify-center gap-2 mt-4">
        {[...Array(totalWeeks)].map((_, i) => ( 
          <button
            key={i}
            onClick={() => onCalendarPageChange(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentCalendarPage === i ? 'bg-red-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to week ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default AppointmentCalendar;