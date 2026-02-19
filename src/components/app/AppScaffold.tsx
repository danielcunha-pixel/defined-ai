"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/docs/Sidebar";
import { Search, type SearchEntry } from "@/components/docs/Search";

type AppScaffoldProps = {
  children: React.ReactNode;
  searchEntries: SearchEntry[];
};

export function AppScaffold({ children, searchEntries }: AppScaffoldProps) {
  const pathname = usePathname();
  const isFrameRoute = pathname?.startsWith("/visual-qa/") && pathname?.endsWith("/frame");

  if (isFrameRoute) {
    return (
      <TooltipProvider>
        {children}
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col lg:pl-0">
          <header className="sticky top-0 z-30 flex h-14 items-center border-b border-grey-20 bg-white/95 px-6 backdrop-blur-sm lg:px-8">
            <div className="flex flex-1 items-center gap-4 pl-12 lg:pl-0">
              <Search entries={searchEntries} />
            </div>
          </header>

          <main className="flex-1 px-6 py-8 lg:px-12 lg:py-10">
            <div className="mx-auto w-full max-w-[1440px]">{children}</div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
