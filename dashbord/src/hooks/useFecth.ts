import { useEffect, useState } from "react";

export function useFetch() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://8t6gkm38-4000.inc1.devtunnels.ms/api/issues")
      .then((res) => {
        return res.ok ? res.json() : null;
      })
      .then((json) => {
        setData(json.data);
      })
      .catch(() => setData(null));
  }, []);
  return data;
}
