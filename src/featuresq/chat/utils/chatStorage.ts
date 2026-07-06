import type { Chat } from "../types/chat";

const CHATS_KEY = "ai-chatbox-chats";
const ACTIVE_CHAT_KEY = "ai-chatbox-active-chat";

export function loadChats(): Chat[] | null {
  const storedChats = localStorage.getItem(CHATS_KEY);

  if (!storedChats) {
    return null;
  }

  try {
    return JSON.parse(storedChats) as Chat[];
  } catch {
    return null;
  }
}

export function saveChats(chats: Chat[]): void {
  localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
}

export function loadActiveChatId(): string | null {
  return localStorage.getItem(ACTIVE_CHAT_KEY);
}

export function saveActiveChatId(chatId: string): void {
  localStorage.setItem(ACTIVE_CHAT_KEY, chatId);
}

export function clearStorage(): void {
  localStorage.removeItem(CHATS_KEY);
  localStorage.removeItem(ACTIVE_CHAT_KEY);
}
