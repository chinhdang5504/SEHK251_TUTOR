import { useEffect, useState } from 'react'

const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => clearInterval(timer)
  }, [value, delay])

  return debounceValue
}

export default useDebounce
