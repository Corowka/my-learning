import { useState } from "react";

type FetchingCallback = (...args: any[]) => Promise<void>;

type UseFetchingResult = [
  any,
  boolean,
  string | null,
];

const useFetching = <T extends FetchingCallback>(callback: T): UseFetchingResult => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetching = async (...args: any[]) => {
    try {
      setLoading(true);
      await callback(...args);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return [fetching, isLoading, error];
};

export default useFetching;
