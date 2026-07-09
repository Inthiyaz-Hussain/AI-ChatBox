import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github-dark.css";

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
      rehypePlugins={[rehypeHighlight]}
      components={{
        pre({ children }) {
          const child = React.Children.only(children) as React.ReactElement<{
            className?: string;
            children?: React.ReactNode;
          }>;

          const className = child.props.className ?? "";

          const language = className.replace("language-", "") || "text";

          const code =
            typeof child.props.children === "string"
              ? child.props.children
              : String(child.props.children ?? "");

          return (
            <CodeBlock language={language} code={code.trimEnd()}>
              {children}
            </CodeBlock>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
