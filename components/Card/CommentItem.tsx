import { Trash2 } from "lucide-react";
import { formatDate } from "@/utils/Date/date";

type Comment = {
  id: string;
  content: string;
  user_id: string;
  user_email: string;
  created_at: string;
};

type CommentItemProps = {
  comment: Comment;
  userId: string | null;
  handleDeleteComment: (commentId: string) => void;
};

const CommentItem = ({ comment, userId, handleDeleteComment }: CommentItemProps) => {
  return (
    <li className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* Avatar */}
          <img
            src={`https://avatars.dicebear.com/api/initials/${comment.user_email.split("@")[0]}.svg`}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          {/* Username */}
          <p className="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            {comment.user_email.split("@")[0]}
          </p>
        </div>

        {/* Delete Button (Visible only to the comment owner) */}
        {userId === comment.user_id && (
          <button
            onClick={() => handleDeleteComment(comment.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Comment Content */}
      <p className="mt-2 text-gray-600 dark:text-gray-400">{comment.content}</p>

      {/* Timestamp */}
      <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
        {formatDate(comment.created_at)}
      </p>
    </li>
  );
};

export default CommentItem;
