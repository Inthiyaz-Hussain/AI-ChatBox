import MarkdownRenderer from "./Markdown/MarkdownRenderer";
import MessageActions from "./MessageActions/MessageActions";
import CopyMessageButton from "./MessageActions/CopyMessageButton";
import RegenerateButton from "./MessageActions/RegenerateButton";

type MessageBubbleProps = {
  role: "user" | "assistant";
  content: string;
  onRegenerate: () => void;
};
export default function MessageBubble({
  role,
  content,
  onRegenerate,
}: MessageBubbleProps): React.JSX.Element {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-2xl px-5 py-3 ${
          isUser
            ? "bg-blue-600 text-white"
            : "border border-gray-200 bg-white text-gray-900"
        }`}
      >
        <MarkdownRenderer content={content} />

        {role === "assistant" && (
          <MessageActions>
            <CopyMessageButton message={content} />
            <RegenerateButton onRegenerate={onRegenerate} />
          </MessageActions>
        )}
      </div>
    </div>
  );
}
