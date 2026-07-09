import { create } from "zustand";

import { dummyChats } from "../data/dummyChats";
import {
  loadChats,
  loadActiveChatId,
  saveChats,
  saveActiveChatId,
} from "../utils/chatStorage";

import type { Chat } from "../types/chat";
import type { Message } from "../types/message";

type ChatStore = {
  chats: Chat[];
  activeChatId: string;
  searchQuery: string;

  setSearchQuery: (query: string) => void;

  handleNewChat: () => void;
  handleSelectChat: (chatId: string) => void;
  handleDeleteChat: (chatId: string) => void;
  handleRenameChat: (chatId: string, title: string) => void;

  addMessageToActiveChat: (message: Message) => void;
};

const initialChats = loadChats() ?? dummyChats;

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: initialChats,
  activeChatId: loadActiveChatId() ?? initialChats[0].id,
  searchQuery: "",

  setSearchQuery: (query) =>
    set({
      searchQuery: query,
    }),

  handleNewChat: () => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [],
    };

    const updatedChats = [...get().chats, newChat];

    saveChats(updatedChats);
    saveActiveChatId(newChat.id);

    set({
      chats: updatedChats,
      activeChatId: newChat.id,
    });
  },

  handleSelectChat: (chatId) => {
    saveActiveChatId(chatId);

    set({
      activeChatId: chatId,
    });
  },

  handleDeleteChat: (chatId) => {
    const chats = get().chats;

    if (chats.length === 1) {
      return;
    }

    const updatedChats = chats.filter((chat) => chat.id !== chatId);

    let activeChatId = get().activeChatId;

    if (activeChatId === chatId) {
      activeChatId = updatedChats[0].id;
    }

    saveChats(updatedChats);
    saveActiveChatId(activeChatId);

    set({
      chats: updatedChats,
      activeChatId,
    });
  },

  handleRenameChat: (chatId, title) => {
    const updatedChats = get().chats.map((chat) =>
      chat.id === chatId
        ? {
            ...chat,
            title,
          }
        : chat,
    );

    saveChats(updatedChats);

    set({
      chats: updatedChats,
    });
  },

  addMessageToActiveChat: (message) => {
    const activeChatId = get().activeChatId;

    const updatedChats = get().chats.map((chat) =>
      chat.id === activeChatId
        ? {
            ...chat,
            messages: [...chat.messages, message],
          }
        : chat,
    );

    saveChats(updatedChats);

    set({
      chats: updatedChats,
    });
  },
}));
