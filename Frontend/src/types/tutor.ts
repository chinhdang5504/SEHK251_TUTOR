export interface Tutor {
  id: number;
  avatarUrl: string;
  fullName: string;
  faculty: string;
  email: string;
  phone: string;
  availableClasses: number;
}

export interface ClassItem {
  id: number;
  date: string;
  time: string;
  subject: string;
  room: string;
  status: "Enroll" | "Full" | "Enrolled";
}
