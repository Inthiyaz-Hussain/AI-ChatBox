import { useEffect, useState } from "react";

import { dummyChats } from "../data/dummyChats";

import {
  loadChats,
  saveChats,
  loadActiveChatId,
  saveActiveChatId,
} from "../utils/chatStorage";

import type { Chat } from "../types/chat";
import type { Message } from "../types/message";

export default function useChat() {
  const initialChats = loadChats() ?? dummyChats;

  const [chats, setChats] = useState<Chat[]>(initialChats);

  const [activeChatId, setActiveChatId] = useState<string>(
    () => loadActiveChatId() ?? initialChats[0].id,
  );
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Effects
  useEffect(() => {
    saveChats(chats);
  }, [chats]);
  useEffect(() => {
    saveActiveChatId(activeChatId);
  }, [activeChatId]);

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const addMessageToActiveChat = (message: Message): void => {
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

  const handleSendMessage = (message: string): void => {
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
        content: `# Hello

This is **bold**

This is *italic*

- React
- TypeScript
- AI

\`\`\`tsx
function hello() {
  console.log("Hello World");
}
\`\`\`
`,
      };

      addMessageToActiveChat(aiMessage);

      setIsTyping(false);
    }, 1000);
  };

  const handleNewChat = (): void => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [],
    };

    setChats((prevChats) => [...prevChats, newChat]);
    setActiveChatId(newChat.id);
  };

  const handleSelectChat = (chatId: string): void => {
    setActiveChatId(chatId);
  };

  const handleDeleteChat = (chatId: string): void => {
    if (chats.length === 1) {
      return;
    }

    const updatedChats = chats.filter((chat) => chat.id !== chatId);

    setChats(updatedChats);

    if (activeChatId === chatId) {
      setActiveChatId(updatedChats[0].id);
    }
  };

  const handleRenameChat = (chatId: string, title: string): void => {
    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id !== chatId) {
          return chat;
        }

        return {
          ...chat,
          title,
        };
      }),
    );
  };

  return {
    chats: filteredChats,
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
  };
}
