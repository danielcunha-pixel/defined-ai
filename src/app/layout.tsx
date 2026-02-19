import type { Metadata } from "next";
import localFont from "next/font/local";
import { type SearchEntry } from "@/components/docs/Search";
import { AppScaffold } from "@/components/app/AppScaffold";
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
        <AppScaffold searchEntries={searchEntries}>{children}</AppScaffold>
      </body>
    </html>
  );
}
