import { useState } from "react";

import Sidebar from "../featuresq/chat/components/Sidebar";
import ChatHeader from "../featuresq/chat/components/ChatHeader";
import ChatWindow from "../featuresq/chat/components/ChatWindow";
import PromptInput from "../featuresq/chat/components/PromptInput";

import { dummyChats } from "../featuresq/chat/data/dummyChats";

import type { Chat } from "../featuresq/chat/types/chat";
import type { Message } from "../featuresq/chat/types/message";

export default function Chat() {
  // State
  const [chats, setChats] = useState<Chat[]>(dummyChats);
  const [activeChatId] = useState<string>(dummyChats[0].id);
  const [isTyping, setIsTyping] = useState(false);

  // Derived State
  const activeChat = chats.find((chat) => chat.id === activeChatId);

  // Helper Functions
  const addMessageToActiveChat = (message: Message) => {
    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id !== activeChatId) {
          return chat;
        }

        return {
          ...chat,
          messages: [...chat.messages, message],
        };
      }),
    );
  };

  const handleSendMessage = (message: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };

    addMessageToActiveChat(userMessage);

    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `You said: "${message}"`,
      };

      addMessageToActiveChat(aiMessage);

      setIsTyping(false);
    }, 1000);
  };

  // UI
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col bg-gray-100">
        <ChatHeader />

        <ChatWindow messages={activeChat?.messages ?? []} isTyping={isTyping} />

        <PromptInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
