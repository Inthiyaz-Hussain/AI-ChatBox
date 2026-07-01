import { MessageSquarePlus, User } from "lucide-react";

const chats = [
  {
    id: 1,
    title: "React Interview",
  },
  {
    id: 2,
    title: "Angular Questions",
  },
  {
    id: 3,
    title: "Python Basics",
  },
  {
    id: 4,
    title: "AI Roadmap",
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="border-b border-gray-200 p-5">
        <h1 className="text-2xl font-bold text-blue-600">AI Chat</h1>
      </div>

      {/* New Chat */}
      <div className="p-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700">
          <MessageSquarePlus size={20} />
          New Chat
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-3">
        {chats.map((chat) => (
          <button
            key={chat.id}
            className="mb-2 w-full rounded-lg px-4 py-3 text-left transition hover:bg-gray-100"
          >
            {chat.title}
          </button>
        ))}
      </div>

      {/* User */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gray-200 p-2">
            <User size={20} />
          </div>

          <div>
            <p className="font-medium">Hussain</p>
            <p className="text-sm text-gray-500">Frontend Developer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
