import React from "react";
import { Prism } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyCodeButton } from "./copy-code-button";

export type CodeBlockProps = {
  code: string;
  language?: string;
  blockType: "code";
};

type Props = CodeBlockProps & {
  className?: string;
};

export const CodeBlock: React.FC<Props> = ({ className, code, language = "" }) => {
  if (!code) return null;

  return (
    <div className={[className, "not-prose"].filter(Boolean).join(" ")}>
      <div className="group relative overflow-clip rounded-xl border p-1 shadow-sm">
        <Prism
          style={oneLight}
          language={language}
          customStyle={{ marginTop: 0, marginBottom: 0, borderRadius: 12 }}
          PreTag="div"
        >
          {code}
        </Prism>

        <div className="absolute top-2 right-2">
          <CopyCodeButton codeToCopy={code} />
        </div>
      </div>
    </div>
  );
};
