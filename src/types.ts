export type PostType = {
  id?: string;
  title?: string;
};

export type CommentType = {
  id: number;
  name: string;
  body: string;
  email: string;
  postId: number;
};
