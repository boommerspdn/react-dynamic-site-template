import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useReactQueryGet, useReactQueryPost } from "@/lib/data";
import { PostType } from "@/types";
import Post from "./components/post";

const HomePage = () => {
  const [input, setInput] = useState("");

  const { data: posts } = useReactQueryGet<PostType[]>(
    "/accounting-about-page",
    { populate: "*" },
    ["posts"],
  );

  const { mutate: createPost } = useReactQueryPost<PostType>("/posts", [
    "posts",
  ]);

  const handleCreate = () => {
    createPost({ id: uuidv4(), title: input });
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      <input
        className="rounded-md border-[1px] border-border p-2"
        type="text"
        placeholder="Data to add"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="rounded-lg bg-blue-400 py-4"
        onClick={() => handleCreate()}
      >
        Add Data
      </button>
      {JSON.stringify(posts)}
      {/* {posts?.map((item) => (
        <Post key={item.id} id={item.id} title={item.title} />
      ))} */}
    </div>
  );
};

export default HomePage;
