import { useState } from "react";
import { Check, Copy } from "lucide-react";

type CodeBlockProps = {
  language: string;
  code: string;
  children: React.ReactNode;
};

export default function CodeBlock({
  language,
  code,
  children,
}: CodeBlockProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-gray-700">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <span className="text-sm font-medium text-gray-300">{language}</span>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy
            </>
          )}
        </button>
      </div>

      <div>{children}</div>
    </div>
  );
}
