import { useReactQueryDelete, useReactQueryPut } from "@/lib/data";
import { PostType } from "@/types";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";

const Post = ({ id, title }: PostType) => {
  const [input, setInput] = useState("");

  const { mutate: editPost } = useReactQueryPut<PostType>(
    "/posts",
    id as string,
    ["posts"],
  );

  const { mutate: deletePost } = useReactQueryDelete("/posts", id as string, [
    "posts",
  ]);

  const handleEdit = () => {
    editPost({ title: input });
  };

  const handleDelete = () => {
    deletePost();
  };

  return (
    <div className="flex gap-2">
      <h1>{title}</h1>
      <div className="flex items-center justify-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="edit the info here"
          className="border-[1px] border-border"
        />
        <button onClick={() => handleEdit()}>
          <Edit />
        </button>
        <button onClick={() => handleDelete()}>
          <Trash />
        </button>
      </div>
    </div>
  );
};

export default Post;
