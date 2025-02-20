import { createPost } from "@/app/actions";

export default function CardForm() {
  return (
    <form
      action={createPost}
      className="p-6 border rounded-xl shadow-md bg-white dark:bg-gray-800 "
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Create a New Post
      </h2>

      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter a title"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="content"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          Content
        </label>
        <textarea
          name="content"
          id="content"
          placeholder="Write your post here..."
          rows={6}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200"
      >
        Publish Post
      </button>
    </form>
  );
}
