import type { Metadata } from "next";
import localFont from "next/font/local";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/docs/Sidebar";
import { Search, type SearchEntry } from "@/components/docs/Search";
import { generateSearchIndex } from "@/lib/mdx";
import "./globals.css";

const satoshi = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Variable.woff2",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Defined.ai Design System",
    template: "%s - Defined.ai Design System",
  },
  description: "Component library and design guidelines for Defined.ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate search index at build time (server component)
  const searchEntries: SearchEntry[] = generateSearchIndex();

  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${satoshi.variable} font-sans antialiased`}>
        <TooltipProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-1 flex-col lg:pl-0">
              {/* Top bar with search */}
              <header className="sticky top-0 z-30 flex h-14 items-center border-b border-grey-20 bg-white/95 px-6 backdrop-blur-sm lg:px-8">
                <div className="flex flex-1 items-center gap-4 pl-12 lg:pl-0">
                  <Search entries={searchEntries} />
                </div>
              </header>

              {/* Main content */}
              <main className="flex-1 px-6 py-8 lg:px-12 lg:py-10">
                <div className="mx-auto w-full max-w-[1440px]">{children}</div>
              </main>
            </div>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
