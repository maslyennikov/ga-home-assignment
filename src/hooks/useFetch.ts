import { useState, useEffect } from "react";

export enum Status {
  IDLE = "IDLE",
  FETCHING = "FETCHING",
  FETCHED = "FETCHED",
  ERROR = "ERROR",
}

const useFetch = <T>(url: string): { data: T | null; status: Status } => {
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setStatus(Status.FETCHING);
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setStatus(Status.FETCHED);
    };

    fetchData().catch((error) => {
      setStatus(Status.ERROR);
      throw new Error(error);
    });
  }, [url]);

  return { data, status };
};

export default useFetch;
