import { Sparkles } from "lucide-react";

export default function EmptyChat() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="mb-6 rounded-full bg-blue-100 p-5">
        <Sparkles size={42} className="text-blue-600" />
      </div>

      <h2 className="text-3xl font-bold text-gray-800">
        How can I help you today?
      </h2>

      <p className="mt-3 max-w-lg text-gray-500">
        Ask anything. Generate code, explain concepts, summarize documents, or
        brainstorm ideas.
      </p>
    </div>
  );
}
