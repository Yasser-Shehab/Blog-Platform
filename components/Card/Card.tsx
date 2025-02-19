"use client";

import ClientCardActions from "./ClientCardActions";
import { useContext } from "react";
import { UserContext } from "@/app/context/UserProvider";

type Post = {
  id: number;
  title: string;
  content: string;
  user_id: string; // Add post owner's ID
};

type CardProps = {
  post: Post;
  user: any; // Adjust type if needed
};

const Card = ({ post, user }: CardProps) => {
  //   const userContext = useContext(UserContext);
  //   const user = userContext?.user || null;

  return (
    <div className="border p-4 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-700 mb-2">{post.content}</p>

      {/* Pass post owner's ID */}
      <ClientCardActions postId={post.id} postUserId={post.user_id} user={user} />
    </div>
  );
};

export default Card;
