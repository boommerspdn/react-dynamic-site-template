import { useFetch } from "@/lib/data";

const HomePage = () => {
  const data = useFetch("/posts", null)

  return <code className="text-xs underline">{JSON.stringify(data)}</code>;
};

export default HomePage;
