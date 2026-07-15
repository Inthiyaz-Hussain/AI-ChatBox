import { Check, Copy } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type CopyMessageButtonProps = {
  message: string;
};

export default function CopyMessageButton({
  message,
}: CopyMessageButtonProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);

    toast.success("Message copied");

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-gray-500 transition hover:bg-gray-200 hover:text-black"
    >
      {copied ? <Check size={15} /> : <Copy size={15} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
