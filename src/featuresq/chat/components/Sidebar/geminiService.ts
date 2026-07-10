import {
  GoogleGenerativeAI,
  GenerativeModel,
  ChatSession,
} from "@google/generative-ai";

interface GeminiMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

interface ChatHistoryItem {
  role: "user" | "model";
  parts: { text: string }[];
}

let generativeModel: GenerativeModel | null = null;
const chatSessions = new Map<string, ChatSession>();

/**
 * Initializes the Gemini GenerativeModel with the API key.
 * Throws an error if the API key is not configured.
 */
function initializeGeminiModel() {
  const apiKey = import.meta.env.local.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "VITE_GEMINI_API_KEY is not configured in environment variables.",
    );
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  generativeModel = genAI.getGenerativeModel({ model: "gemini-pro" });
}

/**
 * Sends a message to the Gemini API and gets a response.
 * Maintains conversation history for the given chatId.
 * @param chatId The ID of the current chat session.
 * @param message The user's message.
 * @param history Optional: previous messages in the conversation to maintain context.
 * @returns The assistant's response as a plain markdown string.
 */
export async function getGeminiResponse(
  chatId: string,
  message: string,
  history: ChatHistoryItem[] = [],
): Promise<string> {
  if (!generativeModel) {
    initializeGeminiModel();
  }
  let chat = chatSessions.get(chatId);
  if (!chat) {
    chat = generativeModel!.startChat({ history });
    chatSessions.set(chatId, chat);
  }

  try {
    const result = await chat.sendMessage(message);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error getting Gemini response:", error);
    throw new Error("Failed to get response from AI. Please try again.");
  }
}

/**
 * Clears the chat session history for a given chat ID.
 * @param chatId The ID of the chat session to clear.
 */
export function clearGeminiChatHistory(chatId: string) {
  chatSessions.delete(chatId);
}
