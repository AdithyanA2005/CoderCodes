import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyCodeButton } from "@/app/(root)/collections/[collectionSlug]/[postSlug]/_components/copy-code-button";

interface MarkdownRendererProps {
  markdownContent: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdownContent }) => {
  return (
    <ReactMarkdown
      components={{
        code({ node, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");
          const content = String(children).replace(/\n$/, "");

          return match ? (
            <div className="group relative overflow-clip rounded-xl border p-1 shadow-sm">
              <SyntaxHighlighter
                style={oneLight}
                language={match[1]}
                customStyle={{ marginTop: 0, marginBottom: 0, borderRadius: 12 }}
                PreTag="div"
                {...props}
              >
                {content}
              </SyntaxHighlighter>

              <div className="absolute top-2 right-2">
                <CopyCodeButton codeToCopy={content} />
              </div>
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {markdownContent}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
