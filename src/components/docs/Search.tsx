"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { IconSearch as SearchIcon, IconX as X } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface SearchEntry {
  title: string;
  description: string;
  href: string;
  section: string;
  headings: string[];
  body: string;
}

interface SearchProps {
  entries: SearchEntry[];
}

export function Search({ entries }: SearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return entries
      .map((entry) => {
        let score = 0;
        if (entry.title.toLowerCase().includes(q)) score += 10;
        if (entry.description.toLowerCase().includes(q)) score += 5;
        if (entry.headings.some((h) => h.toLowerCase().includes(q))) score += 3;
        if (entry.body.toLowerCase().includes(q)) score += 1;
        return { ...entry, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [query, entries]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Keyboard shortcut to open search
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        setIsOpen(false);
        setQuery("");
        window.location.href = results[selectedIndex].href;
      }
    },
    [results, selectedIndex]
  );

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className={cn(
          "flex h-9 w-full max-w-[280px] items-center gap-2 rounded-[8px] border border-grey-20 bg-white px-3",
          "ds-text-body-md font-regular text-grey-50",
          "transition-colors hover:border-grey-30 hover:bg-grey-5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-70/50"
        )}
      >
        <SearchIcon size="sm" />
        <span className="flex-1 text-left">Search docs...</span>
        <kbd className="hidden rounded border border-grey-20 bg-grey-5 px-1.5 py-0.5 text-[11px] font-medium text-grey-50 sm:inline-block">
          ⌘K
        </kbd>
      </button>

      {/* Search modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
              setQuery("");
            }
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" aria-hidden="true" />

          {/* Dialog */}
          <div
            className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-[12px] border border-grey-20 bg-white shadow-2xl"
            role="dialog"
            aria-label="Search documentation"
          >
            {/* Input */}
            <div className="flex items-center border-b border-grey-20 px-4">
              <SearchIcon size="sm" className="text-grey-50" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search components, foundations, tokens..."
                className="flex-1 bg-transparent px-3 py-3 ds-text-body-md font-regular text-grey-100 outline-none placeholder:text-grey-40"
                aria-label="Search documentation"
                autoComplete="off"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="flex size-5 items-center justify-center rounded text-grey-40 hover:text-grey-60"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Results */}
            <div
              ref={resultsRef}
              className="max-h-[300px] overflow-y-auto"
              role="listbox"
              aria-label="Search results"
            >
              {query && results.length === 0 && (
                <div className="px-4 py-8 text-center ds-text-body-md font-regular text-grey-50">
                  No results found for &ldquo;{query}&rdquo;
                </div>
              )}
              {results.map((result, index) => (
                <Link
                  key={result.href}
                  href={result.href}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className={cn(
                    "flex flex-col gap-1 px-4 py-3 transition-colors",
                    index === selectedIndex
                      ? "bg-purple-10"
                      : "hover:bg-grey-5"
                  )}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-grey-10 px-1.5 py-0.5 text-[10px] font-medium uppercase text-grey-50">
                      {result.section}
                    </span>
                    <span className="ds-text-body-md font-medium text-grey-100">
                      {result.title}
                    </span>
                  </div>
                  {result.description && (
                    <span className="ds-text-body-sm font-regular text-grey-50 line-clamp-1">
                      {result.description}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Footer */}
            {results.length > 0 && (
              <div className="flex items-center gap-4 border-t border-grey-20 px-4 py-2 text-[11px] text-grey-40">
                <span><kbd className="rounded border border-grey-20 px-1">↑↓</kbd> Navigate</span>
                <span><kbd className="rounded border border-grey-20 px-1">↵</kbd> Open</span>
                <span><kbd className="rounded border border-grey-20 px-1">Esc</kbd> Close</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
