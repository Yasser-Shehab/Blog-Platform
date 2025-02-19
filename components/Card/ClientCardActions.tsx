"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const ClientCardActions = ({ postId, userId }: { postId: number; userId: string }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [commentText, setCommentText] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Example: If using WebSockets, listen for new comments here
    // socket.on("newComment", (comment) => {
    //   setComments((prev) => [...prev, comment]);
    // });
  }, []);

  const handleLike = () => setLikes(likes + 1);
  const handleDislike = () => setDislikes(dislikes + 1);

  const handleComment = () => {
    if (commentText.trim()) {
      setComments([...comments, commentText]);
      setCommentText("");
    }
  };

  // Function to delete a post
  const handleDelete = async () => {
    const supabase = createClient();

    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) {
      console.error("Error deleting post:", error.message);
      return;
    }

    router.refresh(); // Refresh page after deletion
  };

  return (
    <div className="relative border p-4 rounded-lg shadow-md max-w-md mx-auto">
      {/* Delete button (top-right) */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
        <Trash2 size={18} />
      </button>

      <div className="flex gap-4 items-center mt-2">
        <button onClick={handleLike} className="px-2 py-1 bg-blue-500 text-white rounded">
          👍 {likes}
        </button>
        <button onClick={handleDislike} className="px-2 py-1 bg-red-500 text-white rounded">
          👎 {dislikes}
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Comments</h3>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="border p-1 rounded w-full"
        />
        <button onClick={handleComment} className="mt-2 px-3 py-1 bg-green-500 text-white rounded">
          Submit
        </button>
        <ul className="mt-2">
          {comments.map((comment, index) => (
            <li key={index} className="border-b py-1">
              {comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClientCardActions;
