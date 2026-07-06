import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

import type { Chat } from "../../types/chat";

type ChatItemProps = {
  chat: Chat;
  isActive: boolean;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onRenameChat: (chatId: string, title: string) => void;
};

export default function ChatItem({
  chat,
  isActive,
  onSelectChat,
  onDeleteChat,
  onRenameChat,
}: ChatItemProps): React.JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(chat.title);

  const handleRename = (): void => {
    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) {
      setTitle(chat.title);
      setIsEditing(false);
      return;
    }

    onRenameChat(chat.id, trimmedTitle);
    setIsEditing(false);
  };

  return (
    <div
      className={`group mb-2 flex items-center justify-between rounded-lg transition ${
        isActive ? "bg-blue-100" : "hover:bg-gray-100"
      }`}
    >
      {isEditing ? (
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleRename}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleRename();
            }

            if (e.key === "Escape") {
              setTitle(chat.title);
              setIsEditing(false);
            }
          }}
          className="m-2 flex-1 rounded border px-2 py-1 outline-none"
        />
      ) : (
        <button
          onClick={() => onSelectChat(chat.id)}
          onDoubleClick={() => setIsEditing(true)}
          className="flex-1 px-4 py-3 text-left"
        >
          <span className={isActive ? "font-semibold text-blue-700" : ""}>
            {chat.title}
          </span>
        </button>
      )}

      {!isEditing && (
        <button
          onClick={() => onDeleteChat(chat.id)}
          className="mr-2 rounded p-1 opacity-0 transition group-hover:opacity-100 hover:bg-gray-200"
        >
          <MoreHorizontal size={18} />
        </button>
      )}
    </div>
  );
}
