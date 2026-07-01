import MessageBubble from "./MessageBubble";
import EmptyChat from "./EmptyChat";
import type { Message } from "../types/message";
import TypingIndicator from "./TypingIndicator";
import { useEffect, useRef } from "react";

type ChatWindowProps = {
  messages: Message[];
  isTyping: boolean;
};

export default function ChatWindow({ messages, isTyping }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {messages.length === 0 ? (
        <EmptyChat />
      ) : (
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              role={message.role}
              content={message.content}
            />
          ))}
          {isTyping && <TypingIndicator />}

          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
