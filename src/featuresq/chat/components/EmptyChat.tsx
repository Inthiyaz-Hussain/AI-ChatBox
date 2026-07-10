import { Sparkles } from "lucide-react";

export default function EmptyChat() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 rounded-full bg-blue-100 p-5">
        <Sparkles size={42} className="text-blue-600" />
      </div>

      <h2 className="mt-6 text-4xl font-bold text-gray-900 dark:text-white">
        How can I help you today?
      </h2>

      <p className="mt-4 max-w-xl text-gray-500 dark:text-gray-400">
        Ask anything. Generate code, explain concepts, summarize documents, or
        brainstorm ideas.
      </p>
    </div>
  );
}
