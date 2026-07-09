import { useEffect, useState, useCallback } from "react";
import {
  getGeminiResponse,
  clearGeminiChatHistory,
} from "../services/geminiService";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

// Dummy data for initial load if no chats are stored
const dummyChats: Chat[] = [
  {
    id: "1",
    title: "Welcome Chat",
    messages: [
      {
        id: "1",
        role: "assistant",
        content: "Hello! How can I help you today?",
      },
    ],
  },
];

// Utility functions for local storage
const loadChats = (): Chat[] | null => {
  try {
    const serializedChats = localStorage.getItem("chats");
    return serializedChats ? JSON.parse(serializedChats) : null;
  } catch (error) {
    console.error("Error loading chats from local storage:", error);
    return null;
  }
};

const saveChats = (chats: Chat[]): void => {
  try {
    const serializedChats = JSON.stringify(chats);
    localStorage.setItem("chats", serializedChats);
  } catch (error) {
    console.error("Error saving chats to local storage:", error);
  }
};

const loadActiveChatId = (): string | null => {
  try {
    return localStorage.getItem("activeChatId");
  } catch (error) {
    console.error("Error loading active chat ID from local storage:", error);
    return null;
  }
};

const saveActiveChatId = (chatId: string): void => {
  try {
    localStorage.setItem("activeChatId", chatId);
  } catch (error) {
    console.error("Error saving active chat ID to local storage:", error);
  }
};

export default function useChat() {
  const initialChats = loadChats() ?? dummyChats;

  const [chats, setChats] = useState<Chat[]>(initialChats);

  const [activeChatId, setActiveChatId] = useState<string>(
    () => loadActiveChatId() ?? initialChats[0].id,
  );
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const addMessageToActiveChat = useCallback(
    (message: Message): void => {
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
    },
    [activeChatId],
  );

  const handleSendMessage = async (message: string): Promise<void> => {
    if (isLoading || !message.trim()) {
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: message.trim(),
    };

    addMessageToActiveChat(userMessage);

    setIsTyping(true);
    setIsLoading(true);

    const assistantId = crypto.randomUUID();

    addMessageToActiveChat({
      id: assistantId,
      role: "assistant",
      content: "",
    });

    let streamedText = "";

    try {
      for await (const chunk of getGeminiResponse(
        activeChatId,
        message.trim(),
      )) {
        streamedText += chunk;

        setChats((prevChats) =>
          prevChats.map((chat) => {
            if (chat.id !== activeChatId) {
              return chat;
            }

            return {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.id === assistantId
                  ? {
                      ...msg,
                      content: streamedText,
                    }
                  : msg,
              ),
            };
          }),
        );
      }

      if (!streamedText.trim()) {
        throw new Error("AI returned an empty response.");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id !== activeChatId) {
            return chat;
          }

          return {
            ...chat,
            messages: chat.messages.map((msg) =>
              msg.id === assistantId
                ? {
                    ...msg,
                    content: `❌ ${errorMessage}`,
                  }
                : msg,
            ),
          };
        }),
      );
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };
  //     setTimeout(() => {
  //       const aiMessage: Message = {
  //         id: crypto.randomUUID(),
  //         role: "assistant",
  //         content: `# Markdown Demo

  // This is **bold**

  // This is *italic*

  // ## React Example

  // \`\`\`tsx
  // function App() {
  //   return <h1>Hello World</h1>;
  // }
  // \`\`\`

  // ## Python Example

  // \`\`\`python
  // def greet():
  //     print("Hello")
  // \`\`\`
  // `,
  //       };

  //       addMessageToActiveChat(aiMessage);

  //       setIsTyping(false);
  //     }, 1000);

  const handleRegenerateMessage = async (): Promise<void> => {
    if (isLoading) return;

    const activeChatMessages = activeChat?.messages ?? [];

    const lastUserMessage = [...activeChatMessages]
      .reverse()
      .find((message) => message.role === "user");

    if (!lastUserMessage) return;

    const messagesWithoutLastAssistant = [...activeChatMessages];

    if (messagesWithoutLastAssistant.at(-1)?.role === "assistant") {
      messagesWithoutLastAssistant.pop();
    }

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: messagesWithoutLastAssistant,
            }
          : chat,
      ),
    );

    setIsTyping(true);
    setIsLoading(true);

    const assistantId = crypto.randomUUID();

    addMessageToActiveChat({
      id: assistantId,
      role: "assistant",
      content: "",
    });

    let streamedText = "";

    try {
      for await (const chunk of getGeminiResponse(
        activeChatId,
        lastUserMessage.content,
      )) {
        streamedText += chunk;

        setChats((prevChats) =>
          prevChats.map((chat) => {
            if (chat.id !== activeChatId) {
              return chat;
            }

            return {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.id === assistantId
                  ? {
                      ...msg,
                      content: streamedText,
                    }
                  : msg,
              ),
            };
          }),
        );
      }

      if (!streamedText.trim()) {
        throw new Error("AI returned an empty response.");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";

      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id !== activeChatId) {
            return chat;
          }

          return {
            ...chat,
            messages: chat.messages.map((msg) =>
              msg.id === assistantId
                ? {
                    ...msg,
                    content: `❌ ${errorMessage}`,
                  }
                : msg,
            ),
          };
        }),
      );
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleNewChat = (): void => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [],
    };

    setChats((prevChats) => [...prevChats, newChat]);
    clearGeminiChatHistory(newChat.id);
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
    clearGeminiChatHistory(chatId);
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
    isLoading,
    searchQuery,
    handleSendMessage,
    handleRegenerateMessage,
    handleNewChat,
    handleSelectChat,
    handleDeleteChat,
    handleRenameChat,
    setSearchQuery,
  };
}
