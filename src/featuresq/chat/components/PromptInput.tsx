import { useState } from "react";
import { SendHorizontal } from "lucide-react";

type PromptInputProps = {
  onSend: (message: string) => void;
};

export default function PromptInput({ onSend }: PromptInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const text = message.trim();

    if (!text) return;

    onSend(text);
    setMessage("");
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="mx-auto flex max-w-4xl items-center gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Message AI Chat..."
          className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        <button
          onClick={handleSend}
          className="rounded-xl bg-blue-600 p-3 text-white hover:bg-blue-700"
        >
          <SendHorizontal size={20} />
        </button>
      </div>
    </div>
  );
}
