import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debounceSearchTerm, setDebounceSearchTerm] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearchTerm(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounceSearchTerm;
}
