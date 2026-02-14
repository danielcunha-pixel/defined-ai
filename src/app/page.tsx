import Link from "next/link";
import { navigation } from "@/lib/nav";
import { ArrowRight, Palette, Layers, Component, LayoutGrid } from "lucide-react";

const sectionIcons: Record<string, React.ReactNode> = {
  Foundations: <Palette className="size-5 text-purple-60" />,
  Tokens: <Layers className="size-5 text-blue-60" />,
  Components: <Component className="size-5 text-green-60" />,
};

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      {/* Hero */}
      <div className="flex flex-col gap-4">
        <div className="inline-flex items-center gap-2 self-start rounded-full bg-purple-10 px-3 py-1">
          <div className="size-2 rounded-full bg-purple-60" />
          <span className="ds-text-body-sm font-medium text-purple-70">
            Design System v1.0
          </span>
        </div>
        <h1 className="ds-text-display-lg font-semibold text-grey-100">
          Defined.ai Design System
        </h1>
        <p className="ds-text-heading-sm font-regular text-grey-60 max-w-xl">
          A comprehensive component library and design guidelines for building
          consistent, accessible, and beautiful interfaces at Defined.ai.
        </p>
      </div>

      {/* Quick links grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {navigation
          .filter((s) => s.title !== "Getting Started")
          .map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                {sectionIcons[section.title] || (
                  <LayoutGrid className="size-5 text-grey-50" />
                )}
                <h2 className="ds-text-heading-xs font-semibold text-grey-100">
                  {section.title}
                </h2>
              </div>
              <div className="flex flex-col rounded-[12px] border border-grey-20 overflow-hidden divide-y divide-grey-10">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center justify-between px-4 py-3 transition-colors hover:bg-grey-5"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="ds-text-body-md font-medium text-grey-100">
                        {item.title}
                      </span>
                      {item.description && (
                        <span className="ds-text-body-sm font-regular text-grey-50 line-clamp-1">
                          {item.description}
                        </span>
                      )}
                    </div>
                    <ArrowRight className="size-4 text-grey-30 transition-transform group-hover:translate-x-0.5 group-hover:text-purple-60" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Getting started */}
      <div className="rounded-[12px] border border-purple-20 bg-purple-10/30 p-6">
        <h2 className="ds-text-heading-sm font-semibold text-grey-100 mb-2">
          Quick Start
        </h2>
        <p className="ds-text-body-lg font-regular text-grey-70 mb-4">
          Import components directly from <code className="rounded bg-grey-10 px-1.5 py-0.5 text-[13px] font-medium text-purple-70">@/components/ui</code> and use them with the design tokens defined in the system.
        </p>
        <div className="overflow-x-auto rounded-[8px] border border-grey-20 bg-grey-100 p-4">
          <pre className="text-sm leading-relaxed">
            <code className="text-grey-30">
{`import { Button } from "@/components/ui/button"

export function MyComponent() {
  return (
    <Button variant="primary" size="md">
      Get Started
    </Button>
  )
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
