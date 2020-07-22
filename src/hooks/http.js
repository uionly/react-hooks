import { useState, useEffect } from "react";

export const useHttp = (url, deps = []) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then((response) => {
        let data = response.data;
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      console.log("cleaning up");
    };
  }, deps);
  return [isLoading, data];
};
