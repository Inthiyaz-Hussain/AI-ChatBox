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
    searchQuery,
    handleSendMessage,
    handleNewChat,
    handleSelectChat,
    handleDeleteChat,
    handleRenameChat,
    setSearchQuery,
  } = useChat();

  return (
    <div className="flex h-screen">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onRenameChat={handleRenameChat}
      />

      <div className="flex flex-1 flex-col bg-gray-100">
        <ChatHeader />

        <ChatWindow messages={activeChat?.messages ?? []} isTyping={isTyping} />

        <PromptInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
