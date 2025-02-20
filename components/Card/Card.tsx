"use client";

import ClientCardActions from "./ClientCardActions";

type Post = {
  id: number;
  title: string;
  content: string;
  user_id: string;
};

type CardProps = {
  post: Post;
  user: any;
};

const Card = ({ post, user }: CardProps) => {
  return (
    <div className="border p-4 rounded-lg shadow-md max-w-md ">
      <h2 className="text-2xl font-bold mb-5">{post.title}</h2>
      <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 leading-relaxed text-justify md:text-center mb-4 break-words overflow-hidden max-w-full whitespace-pre-wrap">
        {post.content}
      </p>

      {/* Pass post owner's ID */}
      <ClientCardActions postId={post.id} postUserId={post.user_id} user={user} />
    </div>
  );
};

export default Card;
