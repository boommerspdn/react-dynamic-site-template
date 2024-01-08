import { useFetch } from "@/lib/data";
import { PostType } from "@/types";

const HomePage = () => {
  const { data } = useFetch<PostType[]>("/posts", { userId: "1" });
  console.log(data);

  return (
    <code className="text-center">
      {data?.map((item) => (
        <h6 key={item.id}>{item.title}</h6>
      ))}
    </code>
  );
};

export default HomePage;
