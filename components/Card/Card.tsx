"use client";

import ClientCardActions from "./ClientCardActions";
import { useContext } from "react";
import { UserContext } from "@/app/context/UserProvider";
type Post = {
  id: number;
  title: string;
  content: string;
};

const Card = ({ post }: { post: Post }) => {
  const userContext = useContext(UserContext);

  if (!userContext || !userContext.user) {
    return <p>Loading...</p>;
  }

  const { user } = userContext;
  return (
    <div className="border p-4 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-700 mb-2">{post.content}</p>
      <ClientCardActions postId={post.id} userId={user.id} />
    </div>
  );
};

export default Card;
