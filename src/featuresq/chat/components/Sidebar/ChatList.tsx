import ChatItem from "./ChatItem";

import type { Chat } from "../../types/chat";

type ChatListProps = {
  chats: Chat[];
  activeChatId: string;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onRenameChat: (chatId: string, title: string) => void;
};

export default function ChatList({
  chats,
  activeChatId,
  onSelectChat,
  onDeleteChat,
  onRenameChat,
}: ChatListProps): React.JSX.Element {
  return (
    <div className="flex-1 overflow-y-auto px-3">
      {chats.map((chat) => (
        <ChatItem
          key={chat.id}
          chat={chat}
          isActive={chat.id === activeChatId}
          onSelectChat={onSelectChat}
          onDeleteChat={onDeleteChat}
          onRenameChat={onRenameChat}
        />
      ))}
    </div>
  );
}
