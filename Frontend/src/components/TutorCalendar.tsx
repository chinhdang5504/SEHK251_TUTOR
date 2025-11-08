
// import { useState, useEffect } from "react";

// // Interface for each calendar cell
// interface CalendarDay {
//   day: number;
//   monthOffset: number; // 0 = current month, -1 = prev month, +1 = next month
//   isToday: boolean;
//   fullDate: Date;
// }

// const monthNames = [
//   "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
// ];

// const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// const TutorCalendar = ({ onSelectDate }: { onSelectDate?: (date: string) => void }) => {
//   const [currentDate, setCurrentDate] = useState(new Date()); // use actual current date
//   const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);

//   useEffect(() => {
//     generateCalendar(currentDate);
//   }, [currentDate]);

//   const generateCalendar = (date: Date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();

//     const firstDayOfMonth = new Date(year, month, 1);
//     const lastDayOfMonth = new Date(year, month + 1, 0);

//     const firstWeekday = firstDayOfMonth.getDay();
//     const totalDays = lastDayOfMonth.getDate();

//     const prevMonthLastDay = new Date(year, month, 0).getDate();

//     const days: CalendarDay[] = [];

//     // Fill previous month days
//     for (let i = firstWeekday - 1; i >= 0; i--) {
//       const day = prevMonthLastDay - i;
//       const fullDate = new Date(year, month - 1, day);
//       days.push({ day, monthOffset: -1, isToday: isToday(fullDate), fullDate });
//     }

//     // Current month days
//     for (let i = 1; i <= totalDays; i++) {
//       const fullDate = new Date(year, month, i);
//       days.push({ day: i, monthOffset: 0, isToday: isToday(fullDate), fullDate });
//     }

//     // Next month days to fill last week
//     while (days.length % 7 !== 0) {
//       const day = days.length - totalDays - firstWeekday + 1;
//       const fullDate = new Date(year, month + 1, day);
//       days.push({ day, monthOffset: 1, isToday: isToday(fullDate), fullDate });
//     }

//     setCalendarDays(days);
//   };

//   const isToday = (date: Date) => {
//     const now = new Date();
//     return (
//       date.getDate() === now.getDate() &&
//       date.getMonth() === now.getMonth() &&
//       date.getFullYear() === now.getFullYear()
//     );
//   };

//   const goPrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   const goNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

//   const handleDayClick = (day: CalendarDay) => {
//     const selectedDate = day.fullDate.toISOString().split("T")[0]; // "YYYY-MM-DD"

//     // 🔹 Example: call API here
//     /*
//       fetch(`/api/tutors/${tutorId}/availability?date=${selectedDate}`)
//         .then(res => res.json())
//         .then(data => {
//           // data => { availableSlots: [...] }
//         })
//     */

//     if (onSelectDate) onSelectDate(selectedDate);
//   };

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex justify-between items-center mb-2">
//         <button onClick={goPrevMonth}>&lt;</button>
//         <span className="font-semibold">
//           {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
//         </span>
//         <button onClick={goNextMonth}>&gt;</button>
//       </div>

//       {/* Days of week */}
//       <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-1">
//         {daysOfWeek.map((d) => (
//           <div key={d}>{d}</div>
//         ))}
//       </div>

//       {/* Calendar grid */}
//       <div className="grid grid-cols-7 gap-1">
//         {calendarDays.map((day, idx) => (
//           <div
//             key={idx}
//             onClick={() => handleDayClick(day)}
//             className={`
//               aspect-square flex items-center justify-center text-sm rounded cursor-pointer
//               ${day.monthOffset === 0 ? "text-gray-700" : "text-gray-400"}
//               ${day.isToday ? "bg-red-600 text-white font-bold" : ""}
//               hover:bg-gray-200
//             `}
//           >
//             {day.day}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TutorCalendar;
import { useState, useEffect } from "react";

interface CalendarDay {
  day: number;
  monthOffset: number; // 0=current, -1=prev, +1=next
  isToday: boolean;
  fullDate: Date;
}

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TutorCalendar = ({ onSelectDate }: { onSelectDate?: (date: string) => void }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);

  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate]);

  const generateCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const firstWeekday = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const days: CalendarDay[] = [];

    // Previous month days
    for (let i = firstWeekday - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const fullDate = new Date(year, month - 1, day);
      days.push({ day, monthOffset: -1, isToday: isToday(fullDate), fullDate });
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      const fullDate = new Date(year, month, i);
      days.push({ day: i, monthOffset: 0, isToday: isToday(fullDate), fullDate });
    }

    // Next month days to fill last week
    while (days.length % 7 !== 0) {
      const day = days.length - totalDays - firstWeekday + 1;
      const fullDate = new Date(year, month + 1, day);
      days.push({ day, monthOffset: 1, isToday: isToday(fullDate), fullDate });
    }

    setCalendarDays(days);
  };

  const isToday = (date: Date) => {
    const now = new Date();
    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  };

  const goPrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const goNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const handleDayClick = (day: CalendarDay) => {
    const selectedDate = day.fullDate.toISOString().split("T")[0]; // YYYY-MM-DD
    if (onSelectDate) onSelectDate(selectedDate);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <button onClick={goPrevMonth}>&lt;</button>
        <span className="font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <button onClick={goNextMonth}>&gt;</button>
      </div>

      <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-1">
        {daysOfWeek.map((d) => (<div key={d}>{d}</div>))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, idx) => (
          <div
            key={idx}
            onClick={() => handleDayClick(day)}
            className={`
              aspect-square flex items-center justify-center text-sm rounded-[16px] cursor-pointer
              ${day.monthOffset === 0 ? "text-gray-700" : "text-gray-400"}
              ${day.isToday ? "bg-red-600 text-white font-bold" : ""}
              hover:bg-gray-200
            `}
          >
            {day.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorCalendar;
