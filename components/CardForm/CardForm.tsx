import { createPost } from "@/app/actions";

export default function CardForm() {
  return (
    <form
      action={createPost}
      className="p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Create a New Post
      </h2>

      {/* Title Input */}
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter a title"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
          required
        />
      </div>

      {/* Content Textarea */}
      <div className="mb-6">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Content
        </label>
        <textarea
          name="content"
          id="content"
          placeholder="Write your post here..."
          rows={5}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
      >
        Post
      </button>
    </form>
  );
}
