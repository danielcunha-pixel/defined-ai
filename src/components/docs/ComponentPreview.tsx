"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";
import { Eye } from "lucide-react";
import { IconCode as Code } from "@/components/icons";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  highlightedHtml?: string;
  title?: string;
}

export function ComponentPreview({
  children,
  code,
  highlightedHtml,
  title,
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <div className="my-6 overflow-hidden rounded-[12px] border border-grey-20">
      {/* Tab bar */}
      <div className="flex items-center gap-1 border-b border-grey-20 bg-grey-5 px-2">
        {title && (
          <span className="mr-auto px-2 py-2 ds-text-body-sm font-medium text-grey-60">
            {title}
          </span>
        )}
        <div className={cn("flex", title ? "" : "w-full")} role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === "preview"}
            onClick={() => setActiveTab("preview")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2.5 ds-text-body-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-70/50 focus-visible:ring-inset rounded-t",
              activeTab === "preview"
                ? "border-b-2 border-purple-70 text-purple-70"
                : "text-grey-50 hover:text-grey-80"
            )}
          >
            <Eye className="size-3.5" />
            Preview
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "code"}
            onClick={() => setActiveTab("code")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2.5 ds-text-body-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-70/50 focus-visible:ring-inset rounded-t",
              activeTab === "code"
                ? "border-b-2 border-purple-70 text-purple-70"
                : "text-grey-50 hover:text-grey-80"
            )}
          >
            <Code size={14} />
            Code
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div role="tabpanel">
        {activeTab === "preview" ? (
          <div className="flex min-h-[120px] items-center justify-center p-8 bg-white">
            {children}
          </div>
        ) : (
          <CodeBlock code={code} highlightedHtml={highlightedHtml} />
        )}
      </div>
    </div>
  );
}
