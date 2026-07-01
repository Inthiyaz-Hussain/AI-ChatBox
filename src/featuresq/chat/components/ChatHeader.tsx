import { MoreVertical } from "lucide-react";

export default function ChatHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div>
        <h2 className="text-lg font-semibold">AI Chat</h2>

        <p className="text-sm text-gray-500">Ask me anything</p>
      </div>

      <button className="rounded-lg p-2 transition hover:bg-gray-100">
        <MoreVertical size={20} />
      </button>
    </header>
  );
}
