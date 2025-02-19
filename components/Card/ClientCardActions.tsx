"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type User = {
  id: string;
};

const ClientCardActions = ({
  postId,
  postUserId,
  user,
}: {
  postId: number;
  postUserId: string;
  user: User | null;
}) => {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [dislikes, setDislikes] = useState(0);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [commentText, setCommentText] = useState("");
  const supabase = createClient();
  const router = useRouter();

  const isPostOwner = user?.id === postUserId;

  useEffect(() => {
    // Example: If using WebSockets, listen for new comments here
    // socket.on("newComment", (comment) => {
    //   setComments((prev) => [...prev, comment]);
    // });
  }, []);

  useEffect(() => {
    const fetchReactions = async () => {
      const { data: likeCount } = await supabase
        .from("likes")
        .select("*", { count: "exact" })
        .eq("post_id", postId);

      const { data: dislikeCount } = await supabase
        .from("dislikes")
        .select("*", { count: "exact" })
        .eq("post_id", postId);

      const { data: userLike } = await supabase
        .from("likes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", user?.id)
        .single();

      const { data: userDislike } = await supabase
        .from("dislikes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", user?.id)
        .single();

      setLikes(likeCount?.length || 0);
      setDislikes(dislikeCount?.length || 0);
      setHasLiked(!!userLike);
      setHasDisliked(!!userDislike);
    };

    fetchReactions();
  }, [postId, user?.id]);

  const handleLike = async () => {
    if (!user) return;

    if (hasLiked) {
      // Remove like
      await supabase.from("likes").delete().eq("post_id", postId).eq("user_id", user.id);
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      // Remove dislike if user has already disliked
      if (hasDisliked) {
        await supabase.from("dislikes").delete().eq("post_id", postId).eq("user_id", user.id);
        setDislikes((prev) => prev - 1);
        setHasDisliked(false);
      }

      // Add like
      await supabase.from("likes").insert([{ post_id: postId, user_id: user.id }]);
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };
  // Handle dislike toggle
  const handleDislike = async () => {
    if (!user) return;

    if (hasDisliked) {
      // Remove dislike
      await supabase.from("dislikes").delete().eq("post_id", postId).eq("user_id", user.id);
      setDislikes((prev) => prev - 1);
      setHasDisliked(false);
    } else {
      // Remove like if user has already liked
      if (hasLiked) {
        await supabase.from("likes").delete().eq("post_id", postId).eq("user_id", user.id);
        setLikes((prev) => prev - 1);
        setHasLiked(false);
      }

      // Add dislike
      await supabase.from("dislikes").insert([{ post_id: postId, user_id: user.id }]);
      setDislikes((prev) => prev + 1);
      setHasDisliked(true);
    }
  };

  const handleComment = () => {
    if (commentText.trim()) {
      setComments([...comments, commentText]);
      setCommentText("");
    }
  };

  // Function to delete a post (only if the user is the post owner)
  const handleDelete = async () => {
    if (!isPostOwner) return;

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
      {/* Delete button (Only visible if user is the owner) */}
      {isPostOwner && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          <Trash2 size={18} />
        </button>
      )}

      {/* Like & Dislike buttons (Disabled if no user is logged in) */}
      <div className="flex gap-4 items-center mt-2">
        <button
          onClick={handleLike}
          disabled={!user}
          className={`px-2 py-1 rounded ${
            user ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          👍 {likes}
        </button>
        <button
          onClick={handleDislike}
          disabled={!user}
          className={`px-2 py-1 rounded ${
            user ? "bg-red-500 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          👎 {dislikes}
        </button>
      </div>

      {/* Comment Section (Disabled for non-logged-in users) */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Comments</h3>
        {user ? (
          <>
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="border p-1 rounded w-full"
            />
            <button
              onClick={handleComment}
              className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          </>
        ) : (
          <p className="text-gray-500 text-sm">Log in to comment.</p>
        )}
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
