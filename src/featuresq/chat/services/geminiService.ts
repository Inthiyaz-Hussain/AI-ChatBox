import {
  GoogleGenerativeAI,
  GenerativeModel,
  ChatSession,
} from "@google/generative-ai";

interface GeminiMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export interface ChatHistoryItem {
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
  generativeModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
}

/**
 * Sends a message to the Gemini API and gets a response.
 * Maintains conversation history for the given chatId.
 * @param chatId The ID of the current chat session.
 * @param message The user's message.
 * @param history Optional: previous messages in the conversation to maintain context.
 * @returns The assistant's response as a plain markdown string.
 * @returns An AsyncGenerator that yields chunks of the assistant's response.
 */
export async function* getGeminiResponse( // Changed to an async generator
  chatId: string,
  message: string,
  history: ChatHistoryItem[] = [],
): AsyncGenerator<string, void, undefined> {
  // Changed return type
  if (!generativeModel) {
    initializeGeminiModel();
  }
  let chat = chatSessions.get(chatId);
  if (!chat) {
    chat = generativeModel!.startChat({ history: history }); // Pass history directly
    chatSessions.set(chatId, chat);
  }

  try {
    const result = await chat.sendMessageStream(message); // Use sendMessageStream
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        yield chunkText;
      }
    }
  } catch (error: unknown) {
    console.error("Gemini Error:", error);

    let message = "Something went wrong. Please try again.";

    if (error instanceof Error) {
      if (error.message.includes("API_KEY")) {
        message = "Invalid Gemini API key.";
      } else if (error.message.includes("429")) {
        message = "Rate limit exceeded. Please wait a moment.";
      } else if (error.message.includes("fetch")) {
        message = "Network error. Please check your internet connection.";
      } else {
        message = error.message;
      }
    }

    throw new Error(message);
  }
}

/**
 * Clears the chat session history for a given chat ID.
 * @param chatId The ID of the chat session to clear.
 */
export function clearGeminiChatHistory(chatId: string) {
  chatSessions.delete(chatId);
}
