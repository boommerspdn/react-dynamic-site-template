import useSWR from "swr";
import qs from "qs";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useFetch = <T>(url: string, query: object | null | undefined) => {
  let q = ""
  if (typeof query === "object") {
    q = qs.stringify(query);
  }

  const { data, error, isLoading } = useSWR<T>(
    `${import.meta.env.VITE_API_URL}${url}?${q}`,
    fetcher
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
};
