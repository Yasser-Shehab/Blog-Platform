type LikeDislikeProps = {
  likes: number;
  dislikes: number;
  handleLike: () => void;
  handleDislike: () => void;
};

const LikeDislike = ({ likes, dislikes, handleLike, handleDislike }: LikeDislikeProps) => {
  return (
    <div className="flex gap-4 items-center mt-2">
      <button onClick={handleLike} className="px-2 py-1 bg-blue-500 text-white rounded">
        👍 {likes}
      </button>
      <button onClick={handleDislike} className="px-2 py-1 bg-red-500 text-white rounded">
        👎 {dislikes}
      </button>
    </div>
  );
};

export default LikeDislike;
