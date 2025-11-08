import type { Tutor, ClassItem } from "@/types/tutor";

export const mockTutors: Tutor[] = [
  {
    id: 1,
    avatarUrl: "https://i.pravatar.cc/100?img=10",
    fullName: "Lê Đức Thuận",
    faculty: "Computer Science and Engineering",
    email: "ldt@hcmut.edu.vn",
    phone: "0901234567",
    availableClasses: 6,
  },
  {
    id: 2,
    avatarUrl: "https://i.pravatar.cc/100?img=2",
    fullName: "Dương Huy Tường",
    faculty: "Artificial Intelligence",
    email: "dht@hcmut.edu.vn",
    phone: "0912345678",
    availableClasses: 4,
  },
];

export const mockClasses: ClassItem[] = [
  { id: 1, date: "2025-11-30", time: "07:00", subject: "Advanced Programming", room: "H-101", status: "Enroll" },
  { id: 2, date: "2025-11-30", time: "08:30", subject: "Data Structures", room: "H-102", status: "Full" },
  { id: 3, date: "2025-11-30", time: "09:10", subject: "Algorithms", room: "H-103", status: "Enroll" },
  { id: 4, date: "2025-11-30", time: "10:30", subject: "Database Systems", room: "H-104", status: "Full" },
  { id: 5, date: "2025-11-30", time: "11:50", subject: "Software Engineering", room: "H-105", status: "Enroll" },
  { id: 6, date: "2025-11-30", time: "13:00", subject: "Operating Systems", room: "H-106", status: "Full" },
];

export const mockAvailability: Record<string, { available: boolean; hours?: string }> = {
  "2025-11-30": { available: true, hours: "08:00 - 11:00" },
  "2025-12-01": { available: false },
  "2025-12-02": { available: true, hours: "09:00 - 12:00" },
};
