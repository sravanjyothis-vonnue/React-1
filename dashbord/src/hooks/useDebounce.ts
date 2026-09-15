import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number) {
  const [debouncevalue, setDebouncevalue] = useState<T | null>(null);
  useEffect(() => {
    const debounceTime = setTimeout(() => {
      setDebouncevalue(value);
    }, delay);
    return () => {
      clearTimeout(debounceTime);
    };
  }, [value, delay]);
  return debouncevalue;
}
