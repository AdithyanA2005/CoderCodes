"use client";

import { useState } from "react";
import { CopyCheck, CopyIcon, CopyMinus } from "lucide-react";
import { Button } from "@/components/ui/button";

type StatusType = "idle" | "copied" | "failed";

export function CopyCodeButton({ codeToCopy }: { codeToCopy: string }) {
  const [status, setStatus] = useState<StatusType>("idle");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeToCopy);
      setStatus("copied");
    } catch (err) {
      console.error("Failed to copy: ", err);
      setStatus("failed");
    }
    setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <Button
      className="hover:bg-opacity-15 absolute top-3 right-2 space-x-0 bg-yellow-500/5 px-2 text-yellow-300 hover:bg-yellow-500 hover:text-yellow-400"
      onClick={copyToClipboard}
    >
      {status == "idle" ? (
        <CopyIcon className="!size-4" />
      ) : status == "copied" ? (
        <CopyCheck className="!size-4" />
      ) : (
        <CopyMinus className="!size-4" />
      )}
      {status == "idle" ? "Copy" : status == "copied" ? "Copied" : "Failed"}
    </Button>
  );
}
