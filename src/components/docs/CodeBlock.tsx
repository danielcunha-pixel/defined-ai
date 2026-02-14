"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  highlightedHtml?: string;
  language?: string;
}

export function CodeBlock({ code, highlightedHtml, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="group relative overflow-hidden rounded-[8px] border border-grey-20 bg-grey-100">
      {/* Language badge + copy button */}
      <div className="flex items-center justify-between border-b border-grey-90 px-4 py-2">
        <span className="ds-text-body-sm font-regular text-grey-50 uppercase">
          {language}
        </span>
        <button
          onClick={copyCode}
          className={cn(
            "flex items-center gap-1.5 rounded-[4px] px-2 py-1 ds-text-body-sm font-regular transition-colors",
            copied
              ? "text-green-50"
              : "text-grey-50 hover:text-white"
          )}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <>
              <Check className="size-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      {highlightedHtml ? (
        <div
          className="overflow-x-auto p-4 text-sm leading-relaxed [&_pre]:bg-transparent [&_pre]:p-0 [&_code]:bg-transparent"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
          <code className="text-grey-30">{code}</code>
        </pre>
      )}
    </div>
  );
}
