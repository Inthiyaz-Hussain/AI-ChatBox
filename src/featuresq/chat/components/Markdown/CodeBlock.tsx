import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  language?: string;
  value: string;
};

export default function CodeBlock({
  language = "text",
  value,
}: Props): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(value);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-gray-700">
      <div className="flex items-center justify-between bg-gray-900 px-4 py-2 text-sm text-gray-300">
        <span>{language}</span>

        <button
          onClick={copyCode}
          className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-700"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "18px",
          fontSize: "14px",
          borderRadius: 0,
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}
