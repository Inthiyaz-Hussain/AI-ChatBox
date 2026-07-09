import SidebarHeader from "./Sidebar/SidebarHeader";
import SearchBar from "./Sidebar/SearchBar";
import NewChatButton from "./Sidebar/NewChatButton";
import ChatList from "./Sidebar/ChatList";
import SidebarFooter from "./Sidebar/SidebarFooter";

import type { Chat } from "../types/chat";

type SidebarProps = {
  chats: Chat[];
  activeChatId: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;

  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onRenameChat: (chatId: string, title: string) => void;

  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({
  chats,
  activeChatId,
  searchQuery,
  onSearchChange,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onRenameChat,
  isOpen,
  onClose,
}: SidebarProps): React.JSX.Element {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarHeader />

        <SearchBar value={searchQuery} onChange={onSearchChange} />

        <NewChatButton
          onNewChat={() => {
            onNewChat();
            onClose();
          }}
        />

        <ChatList
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={(chatId) => {
            onSelectChat(chatId);
            onClose();
          }}
          onDeleteChat={onDeleteChat}
          onRenameChat={onRenameChat}
        />

        <SidebarFooter />
      </aside>
    </>
  );
}
