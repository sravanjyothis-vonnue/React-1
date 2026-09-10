import { useRef } from "react";

export function Search({ setSearch }: any) {
  const Deleay = 1000;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  return (
    <input
      className="searchBar"
      placeholder="Search here..."
      onChange={(e) => {
        const marquee = document.getElementById("marquee-content");
        marquee?.classList.add();
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
