import axios from "axios";
import qs from "qs";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const fetchContent = async (
  path: string,
  query: object | null | undefined,
) => {
  let q = "";
  if (typeof query === "object") {
    q = qs.stringify(query);
  }
  const res = await fetch(`${import.meta.env.VITE_API_URL}${path}?${q}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export const fetchMultipleContent = async () => {
  const [comment, post] = await Promise.all([
    fetcher(`${import.meta.env.VITE_API_URL}/comments`),
    fetcher(`${import.meta.env.VITE_API_URL}/posts`),
  ]);

  return { comment, post };
};

export const useReactQueryGet = <T>(
  url: string,
  query: object | null | undefined,
  key: Array<string>,
) => {
  return useQuery<T>({
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_API_URL}${url}`, { params: query })
        .then((res) => res.data),
    queryKey: key,
  });
};

export const useReactQueryPost = <T>(url: string, key: Array<string>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dataToPost: T) =>
      axios.post(`${import.meta.env.VITE_API_URL}${url}`, dataToPost),
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: key });
    },
  });
};

export const useReactQueryPut = <T>(
  url: string,
  id: string,
  key: Array<string>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dataToPost: T) =>
      axios.put(`${import.meta.env.VITE_API_URL}${url}/${id}`, dataToPost),
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: key });
    },
  });
};

export const useReactQueryDelete = (
  url: string,
  id: string,
  key: Array<string>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      axios.delete(`${import.meta.env.VITE_API_URL}${url}/${id}`),
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: key });
    },
  });
};
