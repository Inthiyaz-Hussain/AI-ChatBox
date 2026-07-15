import { useEffect, useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";

type PromptInputProps = {
  onSend: (message: string) => void;
  disabled?: boolean;
};

export default function PromptInput({
  onSend,
  disabled = false,
}: PromptInputProps) {
  const [message, setMessage] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height =
      Math.min(textareaRef.current.scrollHeight, 200) + "px";
  }, [message]);

  const handleSend = () => {
    const text = message.trim();

    if (!text || disabled) return;

    onSend(text);
    setMessage("");
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex max-w-4xl items-end gap-3 rounded-2xl border border-gray-300 bg-white p-3 shadow-sm transition dark:border-gray-700 dark:bg-gray-800">
        <textarea
          ref={textareaRef}
          disabled={disabled}
          rows={1}
          value={message}
          placeholder="Message AI Chat..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="max-h-[200px] flex-1 resize-none overflow-y-auto bg-transparent text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
        />

        <button
          disabled={disabled}
          onClick={handleSend}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-500"
        >
          {disabled ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <SendHorizontal size={20} />
          )}
        </button>
      </div>
    </div>
  );
}
