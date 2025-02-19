"use client";

import { useState, useEffect } from "react";

const ClientCardActions = ({ postId }: { postId: number }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [commentText, setCommentText] = useState("");

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

  return (
    <div>
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
