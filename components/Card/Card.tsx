import ClientCardActions from "./ClientCardActions";

type Post = {
  id: number;
  title: string;
  content: string;
};

const Card = ({ post }: { post: Post }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-700 mb-2">{post.content}</p>
      <ClientCardActions postId={post.id} />
    </div>
  );
};

export default Card;
