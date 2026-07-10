import { useState } from "react";
import { SendHorizontal } from "lucide-react";

type PromptInputProps = {
  onSend: (message: string) => void;
  disabled?: boolean;
};

export default function PromptInput({
  onSend,
  disabled = false,
}: PromptInputProps): React.JSX.Element {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const text = message.trim();

    if (disabled || !text) return;

    onSend(text);
    setMessage("");
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <input
            disabled={disabled}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            placeholder="Message AI Chat..."
            className="flex-1 bg-transparent text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
          />

          <button
            disabled={disabled}
            onClick={handleSend}
            className="rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-500"
          >
            {disabled ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <SendHorizontal size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}