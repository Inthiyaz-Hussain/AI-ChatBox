import { useState } from "react";

import Sidebar from "../featuresq/chat/components/Sidebar";
import ChatHeader from "../featuresq/chat/components/ChatHeader";
import ChatWindow from "../featuresq/chat/components/ChatWindow";
import PromptInput from "../featuresq/chat/components/PromptInput";

import useChat from "../featuresq/chat/hooks/useChat";

export default function Chat(): React.JSX.Element {
  const {
    chats,
    activeChat,
    activeChatId,
    isTyping,
    isLoading,
    searchQuery,
    handleSendMessage,
    handleRegenerateMessage,
    handleNewChat,
    handleSelectChat,
    handleDeleteChat,
    handleRenameChat,
    setSearchQuery,
  } = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onRenameChat={handleRenameChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col bg-gray-100 transition-colors dark:bg-gray-950">
        <ChatHeader onOpenSidebar={() => setSidebarOpen(true)} />

        <ChatWindow
          messages={activeChat?.messages ?? []}
          isTyping={isTyping}
          onRegenerate={handleRegenerateMessage}
        />

        <PromptInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
