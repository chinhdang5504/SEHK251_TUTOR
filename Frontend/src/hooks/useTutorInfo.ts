import { useEffect, useState } from "react";
import type { Tutor, ClassItem } from "@/types/tutor";
import { mockTutors, mockClasses, mockAvailability } from "@/mocks/tutor.info.mock";
import tutorApi from "@/api/tutorApi";

export const useTutorInfo = (id: string | undefined, useApi = false) => {
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [availableHours, setAvailableHours] = useState<string>("");

  // Fetch tutor info
  useEffect(() => {
    if (!id) return;

    const fetchTutor = async () => {
      if (useApi) {
        const res = await tutorApi.getTutorById(id);
        setTutor(res.data);
      } else {
        setTutor(mockTutors.find(t => t.id === Number(id)) || mockTutors[0]);
      }
    };

    fetchTutor();
  }, [id, useApi]);

  // Fetch classes
  useEffect(() => {
    if (!id) return;

    const fetchClasses = async () => {
      if (useApi) {
        const res = await tutorApi.getClassesByTutor(id);
        setClasses(res.data);
      } else {
        setClasses(mockClasses);
      }
    };

    fetchClasses();
  }, [id, useApi]);

  // Handle enroll class
  const handleEnroll = (classItem: ClassItem) => {
    if (classItem.status !== "Enroll") return;

    setClasses(prev =>
      prev.map(c =>
        c.id === classItem.id ? { ...c, status: "Enrolled" } : c
      )
    );
  };

  // Handle select date
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    const availability = mockAvailability[date];
    if (availability) {
      setIsAvailable(availability.available);
      setAvailableHours(availability.hours || "");
    } else {
      setIsAvailable(false);
      setAvailableHours("");
    }
  };

  return {
    tutor,
    classes,
    selectedDate,
    isAvailable,
    availableHours,
    handleEnroll,
    handleDateSelect,
  };
};
