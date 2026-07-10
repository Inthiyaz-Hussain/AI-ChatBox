import MarkdownRenderer from "./Markdown/MarkdownRenderer";
import MessageActions from "./MessageActions/MessageActions";
import { Bot, User } from "lucide-react";
import CopyMessageButton from "./MessageActions/CopyMessageButton";
import RegenerateButton from "./MessageActions/RegenerateButton";

type Props = {
  role: "user" | "assistant";
  content: string;
  onRegenerate?: () => void;
};

export default function MessageBubble({
  role,
  content,
  onRegenerate,
}: Props): React.JSX.Element {
  const isUser = role === "user";

  return (
    <div className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
          <Bot size={20} />
        </div>
      )}

      <div className="max-w-[80%]">
        <div
          className={`rounded-2xl px-5 py-4 shadow-sm ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
          }`}
        >
          <MarkdownRenderer content={content} />
        </div>

        {!isUser && (
          <div className="mt-2">
            <MessageActions>
              <CopyMessageButton message={content} />

              {onRegenerate && <RegenerateButton onRegenerate={onRegenerate} />}
            </MessageActions>
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-white">
          <User size={20} />
        </div>
      )}
    </div>
  );
}
