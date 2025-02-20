import CommentItem from "./CommentItem";

type User = {
  id: string;
  email: string;
};

type Comment = {
  id: string;
  content: string;
  user_id: string;
  user_email: string;
  created_at: string;
};

const CommentSection = ({
  user,
  commentText,
  setCommentText,
  handleComment,
  comments,
  handleDeleteComment,
}: {
  user: User | null;
  commentText: string;
  setCommentText: (text: string) => void;
  handleComment: () => void;
  comments: Comment[];
  handleDeleteComment: (commentId: string) => void;
}) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Comments</h3>
      {user ? (
        <>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="border p-1 rounded w-full mb-4"
          />
          <button
            onClick={handleComment}
            className="mt-2 px-3 py-1 bg-green-500 text-white rounded w-full"
          >
            Submit
          </button>
        </>
      ) : (
        <p className="text-sm text-gray-700">Log in to comment</p>
      )}
      <ul className="mt-2 space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            userId={user?.id || null}
            handleDeleteComment={handleDeleteComment}
          />
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
