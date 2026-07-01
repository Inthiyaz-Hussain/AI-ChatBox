import type { Chat } from "../types/chat";

export const dummyChats: Chat[] = [
  {
    id: "chat-1",
    title: "New Chat",
    messages: [
      {
        id: "1",
        role: "assistant",
        content: "Hi! 👋 How can I help you today?",
      },
      {
        id: "2",
        role: "user",
        content: "Explain React Hooks.",
      },
      {
        id: "3",
        role: "assistant",
        content:
          "React Hooks let you use state and other React features inside functional components.",
      },
    ],
  },
];
