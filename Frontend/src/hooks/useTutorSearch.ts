import { useState } from "react"
import { mockTutors } from "@/mocks/tutor.mock"

export const useTutorSearch = () => {
  const USE_API = false
  const [tutors, setTutors] = useState(mockTutors)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const fetchTutors = async (query: string) => {
    setLoading(true)
    setNotFound(false)

    try {
      if (USE_API) {
        // TODO: Gọi API thật sau này
      } else {
        const filtered = mockTutors.filter(
          (t) =>
            t.fullName.toLowerCase().includes(query.toLowerCase()) ||
            t.subject.toLowerCase().includes(query.toLowerCase()) ||
            t.department.name.toLowerCase().includes(query.toLowerCase())
        )
        setTutors(filtered)
        setNotFound(filtered.length === 0)
      }
    } catch (err) {
      console.error(err)
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  return { tutors, loading, notFound, fetchTutors }
}
