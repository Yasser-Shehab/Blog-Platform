const PostEditor = ({
  postTitle,
  postContent,
  setPostTitle,
  setPostContent,
  handleEdit,
  setIsEditing,
}: {
  postTitle: string;
  postContent: string;
  setPostTitle: (title: string) => void;
  setPostContent: (content: string) => void;
  handleEdit: () => void;
  setIsEditing: (editing: boolean) => void;
}) => {
  return (
    <div className="mt-5">
      <input
        type="text"
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        className="w-full border rounded p-2 mb-2"
      />
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        className="w-full border rounded p-2"
      />
      <button onClick={handleEdit} className="mt-2 px-3 py-1 bg-green-500 text-white rounded">
        Save
      </button>
      <button
        onClick={() => setIsEditing(false)}
        className="ml-2 px-3 py-1 bg-gray-500 text-white rounded"
      >
        Cancel
      </button>
    </div>
  );
};

export default PostEditor;
