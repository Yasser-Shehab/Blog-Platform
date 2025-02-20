"use client";

import { useState, useEffect } from "react";
import { Trash2, Edit3, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { formatDate } from "@/utils/Date/date";
import CommentItem from "./CommentItem";
import LikeDislike from "./LikesDislike";
import PostEditor from "./PostEditor";
import CommentSection from "./CommentSection";

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

type Post = {
  id: number;
  title: string;
  content: string;
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
  const [comments, setComments] = useState<Comment[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [commentText, setCommentText] = useState("");
  const supabase = createClient();
  const router = useRouter();

  const isPostOwner = user?.id === postUserId;

  // Fetch the post data when the component mounts
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("title, content")
        .eq("id", postId)
        .single();

      if (!error) {
        setPostTitle(data.title);
        setPostContent(data.content);
      }
    };

    fetchPost();
  }, [postId, supabase]);

  useEffect(() => {
    const fetchReactions = async () => {
      console.log("fetchReactions");

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

    const likeSubscription = supabase
      .channel(`realtime-likes-${postId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "likes",
          filter: `post_id=eq.${postId}`,
        },
        () => {
          fetchReactions();
          //   setComments((prev) => [...prev, payload.new as Comment]);
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "likes", filter: `post_id=eq.${postId}` },
        () => {
          fetchReactions();
        }
      )

      .subscribe();

    const dislikeSubscription = supabase
      .channel(`realtime-dislikes-${postId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "dislikes", filter: `post_id=eq.${postId}` },
        () => {
          fetchReactions();
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "dislikes", filter: `post_id=eq.${postId}` },
        () => {
          fetchReactions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(likeSubscription);
      supabase.removeChannel(dislikeSubscription);
    };
  }, [postId, user?.id, supabase]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase

        .from("comments")
        .select("id, content, user_id, user_email, created_at")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (!error) {
        setComments(data || []);
      }
    };

    fetchComments();

    // Real-time comment subscription
    const channel = supabase
      .channel(`realtime-comments-${postId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: `post_id=eq.${postId}`,
        },
        (payload) => {
          console.log("New comment received:", payload.new);
          setComments((prev) => [...prev, payload.new as Comment]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, supabase]);

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

  const handleComment = async () => {
    if (!user || commentText.trim() === "") return;

    console.log({ user });

    const { error } = await supabase
      .from("comments")
      .insert([
        { post_id: postId, user_id: user.id, content: commentText.trim(), user_email: user.email },
      ]);

    if (!error) {
      setCommentText("");
    }
  };

  const handleEdit = async () => {
    if (!isPostOwner) return;

    const { error } = await supabase
      .from("posts")
      .update({ title: postTitle, content: postContent })
      .eq("id", postId);

    if (!error) {
      setIsEditing(false);
      router.refresh(); // Refresh the page to reflect the changes
    }
  };

  const handleDelete = async () => {
    if (!isPostOwner) return;

    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) {
      console.error("Error deleting post:", error.message);
      return;
    }

    router.refresh(); // Refresh page after deletion
  };

  const handleDeleteComment = async (commentId: string) => {
    console.log(commentId);
    if (!user) return;

    // Delete the comment from the database
    const { error } = await supabase.from("comments").delete().eq("id", commentId);

    if (!error) {
      // Remove the deleted comment from the UI
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } else {
      console.error("Error deleting comment:", error.message);
    }
  };

  return (
    <div className="relative  p-4 rounded-lg shadow-md max-w-md mx-auto">
      {isPostOwner && (
        <div className="absolute top-2 right-2 flex gap-2">
          {isEditing ? (
            <button onClick={handleEdit} className="text-green-500 hover:text-green-700">
              <Check size={18} />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-700"
            >
              <Edit3 size={18} />
            </button>
          )}
          <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
            <Trash2 size={18} />
          </button>
        </div>
      )}

      {isEditing && (
        <PostEditor
          postTitle={postTitle}
          postContent={postContent}
          setPostTitle={setPostTitle}
          setPostContent={setPostContent}
          handleEdit={handleEdit}
          setIsEditing={setIsEditing}
        />
      )}
      <LikeDislike
        likes={likes}
        dislikes={dislikes}
        handleLike={handleLike}
        handleDislike={handleDislike}
      />

      <CommentSection
        user={user}
        commentText={commentText}
        setCommentText={setCommentText}
        handleComment={handleComment}
        comments={comments}
        handleDeleteComment={handleDeleteComment}
      />
    </div>
  );
};

export default ClientCardActions;
