import { MessageSquarePlus } from "lucide-react";

type NewChatButtonProps = {
  onNewChat: () => void;
};

export default function NewChatButton({
  onNewChat,
}: NewChatButtonProps): React.JSX.Element {
  return (
    <div className="p-4">
      <button
        onClick={onNewChat}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700"
      >
        <MessageSquarePlus size={20} />
        New Chat
      </button>
    </div>
  );
}
