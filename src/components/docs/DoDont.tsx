import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DoDontProps {
  type: "do" | "dont";
  children: React.ReactNode;
}

export function DoDont({ type, children }: DoDontProps) {
  const isDo = type === "do";

  return (
    <div
      className={cn(
        "rounded-[8px] border-2 p-4",
        isDo
          ? "border-green-50 bg-green-10/30"
          : "border-red-50 bg-red-10/30"
      )}
    >
      <div className="mb-2 flex items-center gap-1.5">
        {isDo ? (
          <Check className="size-4 text-green-60" />
        ) : (
          <X className="size-4 text-red-60" />
        )}
        <span
          className={cn(
            "ds-text-body-sm font-semibold uppercase",
            isDo ? "text-green-70" : "text-red-70"
          )}
        >
          {isDo ? "Do" : "Don't"}
        </span>
      </div>
      <div className="ds-text-body-md font-regular text-grey-80">{children}</div>
    </div>
  );
}
