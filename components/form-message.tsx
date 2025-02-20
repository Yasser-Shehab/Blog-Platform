export type Message = { success: string } | { error: string } | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {"success" in message && (
        <div className="text-green-600 dark:text-green-400 border-l-2 border-green-600 dark:border-green-400 px-4">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="text-red-600 dark:text-red-400 border-l-2 border-red-600 dark:border-red-400 px-4">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-gray-700 dark:text-gray-300 border-l-2 border-gray-700 dark:border-gray-300 px-4">
          {message.message}
        </div>
      )}
    </div>
  );
}
