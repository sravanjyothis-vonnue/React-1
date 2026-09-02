import { useRef } from "react";

export function Search({ setSearch }: any) {
  const Deleay = 1000;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  return (
    <input
      className="searchBar"
      placeholder="Search for Projects..."
      onChange={(e) => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
          setSearch(e.target.value);
        }, Deleay);
      }}
    ></input>
  );
}
