import { useState, useEffect } from "react";
import { mockSessions } from "@/mocks/sessions.mock";

export interface Session {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  slots: number;
  tutorName: string;
  department: string;
  coverUrl?: string;
}

const USE_API = false;

const fetchPublicSessions = async (query: string): Promise<Session[]> => {
  if (!USE_API) {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? mockSessions.filter(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            (s.subtitle ?? "").toLowerCase().includes(q) ||
            s.tutorName.toLowerCase().includes(q) ||
            s.department.toLowerCase().includes(q)
        )
      : mockSessions;

    return new Promise((resolve) => setTimeout(() => resolve(filtered), 300));
  }

  const res = await fetch(`/api/public-sessions?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to fetch sessions");
  const json = await res.json();
  return json.items;
};

export const usePublicSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchData = async (query: string) => {
    setLoading(true);
    setNotFound(false);
    try {
      const data = await fetchPublicSessions(query);
      setSessions(data);
      setNotFound(data.length === 0);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("");
  }, []);

  return { sessions, loading, notFound, fetchData };
};
