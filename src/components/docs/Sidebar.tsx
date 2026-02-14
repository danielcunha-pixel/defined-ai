"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navigation } from "@/lib/nav";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 flex size-10 items-center justify-center rounded-[8px] border border-grey-20 bg-white shadow-sm lg:hidden"
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-[260px] shrink-0 overflow-y-auto border-r border-grey-20 bg-white px-4 pb-8 pt-6",
          "transition-transform duration-200 ease-in-out",
          "lg:sticky lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        role="navigation"
        aria-label="Documentation sidebar"
      >
        {/* Logo / title */}
        <Link
          href="/"
          className="mb-8 flex items-center gap-2 px-3"
        >
          <div className="flex size-8 items-center justify-center rounded-[6px] bg-purple-70">
            <span className="text-sm font-bold text-white">D</span>
          </div>
          <span className="ds-text-heading-xs font-semibold text-grey-100">
            Design System
          </span>
        </Link>

        {/* Navigation sections */}
        <nav className="flex flex-col gap-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="mb-2 px-3 ds-text-body-sm font-semibold uppercase tracking-wider text-grey-50">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-0.5" role="list">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center rounded-[6px] px-3 py-2 ds-text-body-md font-regular transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-70/50",
                          isActive
                            ? "bg-purple-10 font-medium text-purple-70"
                            : "text-grey-70 hover:bg-grey-5 hover:text-grey-100"
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
