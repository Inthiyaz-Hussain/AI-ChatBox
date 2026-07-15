import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CodeBlock from "./CodeBlock";

type MarkdownRendererProps = {
  content: string;
};

export default function MarkdownRenderer({
  content,
}: MarkdownRendererProps): React.JSX.Element {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {
          const { children, className } = props;

          const match = /language-(\w+)/.exec(className || "");

          if (match) {
            return (
              <CodeBlock
                language={match[1]}
                value={String(children).replace(/\n$/, "")}
              />
            );
          }

          return (
            <code className="rounded bg-gray-200 px-1 py-0.5 font-mono text-sm dark:bg-gray-700 dark:text-white">
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
