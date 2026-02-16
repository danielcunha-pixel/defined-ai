"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { IconChevronDown, IconMenu, IconX } from "@/components/icons";
import {
  SubNavigationAboutDesktop,
  SubNavigationResourcesDesktop,
  SubNavigationSolutionsDesktop,
} from "@/components/ui/sub-navigation-desktop";
import { cn } from "@/lib/utils";

export interface TopNavigationItem {
  label: string;
  href: string;
  parent?: boolean;
  tagText?: string;
  submenu?: "solutions" | "resources" | "about";
}

export type TopNavigationLinkState = "enabled" | "hover" | "pressed" | "focus";
export type TopNavigationHamburgerState = "enabled" | "pressed";

export interface TopNavigationProps extends React.HTMLAttributes<HTMLElement> {
  items?: TopNavigationItem[];
  activeHref?: string;
  linkState?: TopNavigationLinkState;
  logoSrc?: string;
  logoAlt?: string;
  logoHref?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  mobileMenuLabel?: string;
  mobileMenuButtonState?: TopNavigationHamburgerState;
  mobileMenuOpen?: boolean;
  defaultMobileMenuOpen?: boolean;
  onMobileMenuOpenChange?: (open: boolean) => void;
}

const defaultItems: TopNavigationItem[] = [
  { label: "Browse Marketplace", href: "/marketplace" },
  { label: "Solutions", href: "/solutions", parent: true, submenu: "solutions" },
  { label: "Resources", href: "/resources", parent: true, submenu: "resources" },
  { label: "About", href: "/about", parent: true, submenu: "about" },
];

function TopNavigation({
  className,
  items = defaultItems,
  activeHref,
  linkState = "enabled",
  logoSrc = "/logo.svg",
  logoAlt = "Defined.ai",
  logoHref = "/",
  primaryCtaLabel = "Get in touch",
  secondaryCtaLabel = "Become a partner",
  mobileMenuLabel = "Open navigation menu",
  mobileMenuButtonState,
  mobileMenuOpen,
  defaultMobileMenuOpen = false,
  onMobileMenuOpenChange,
  ...props
}: TopNavigationProps) {
  const [uncontrolledMobileMenuOpen, setUncontrolledMobileMenuOpen] = React.useState(defaultMobileMenuOpen);
  const [openDesktopSubnavHref, setOpenDesktopSubnavHref] = React.useState<string | null>(null);
  const isMobileMenuControlled = mobileMenuOpen !== undefined;
  const isMobileMenuOpen = isMobileMenuControlled ? mobileMenuOpen : uncontrolledMobileMenuOpen;
  const mobileMenuId = React.useId();
  const computedMobileMenuButtonState = mobileMenuButtonState ?? "enabled";
  const desktopSubnavRef = React.useRef<HTMLDivElement | null>(null);

  const setMobileMenuOpen = (open: boolean) => {
    if (!isMobileMenuControlled) {
      setUncontrolledMobileMenuOpen(open);
    }
    onMobileMenuOpenChange?.(open);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const closeDesktopSubnav = () => setOpenDesktopSubnavHref(null);
  const openDesktopSubnavItem = items.find((item) => item.href === openDesktopSubnavHref);
  const openDesktopSubnavKind =
    openDesktopSubnavItem?.submenu ??
    (openDesktopSubnavItem?.label.toLowerCase().includes("resource")
      ? "resources"
      : openDesktopSubnavItem?.label.toLowerCase().includes("about")
        ? "about"
        : openDesktopSubnavItem?.label.toLowerCase().includes("solution")
          ? "solutions"
          : null);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDesktopSubnav();
      }
    };
    const onPointerDown = (event: MouseEvent) => {
      if (!desktopSubnavRef.current) return;
      if (!desktopSubnavRef.current.contains(event.target as Node)) {
        closeDesktopSubnav();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, []);

  return (
    <div ref={desktopSubnavRef} className="relative" onMouseLeave={closeDesktopSubnav}>
      <header
        data-slot="top-navigation"
        className={cn(
          "w-full border-b-[0.25px] border-grey-20 bg-white",
          "shadow-[0px_0.5px_1px_0px_var(--color-t-grey-20),0px_0.5px_6px_0px_var(--color-t-grey-5)]",
          className
        )}
        {...props}
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-sp-16 py-sp-16 md:px-sp-24 lg:px-sp-64">
          <div className="flex items-center lg:gap-sp-64">
            <Link href={logoHref} className="inline-flex items-center" aria-label="Go to homepage">
              <Image src={logoSrc} alt={logoAlt} width={120} height={20} className="h-5 w-auto" priority />
            </Link>

            <nav className="hidden items-center gap-sp-6 lg:flex" aria-label="Primary navigation">
              {items.map((item) => {
                const isActive = activeHref === item.href;
                const commonClasses = cn(
                  "inline-flex h-8 items-center overflow-hidden rounded-[8px] ds-text-body-lg font-semibold transition-colors",
                  linkState === "enabled"
                    ? "text-grey-100 hover:bg-grey-10 active:bg-grey-20 focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--color-focus,#4d24c7)]"
                    : linkState === "hover"
                      ? "text-grey-100 bg-grey-10"
                      : linkState === "pressed"
                        ? "text-grey-100 bg-grey-20"
                        : "text-grey-100 shadow-[inset_0_0_0_2px_var(--color-focus,#4d24c7)]",
                  isActive && "bg-grey-10 text-grey-100",
                  item.parent
                    ? "gap-sp-4 pl-sp-12 pr-sp-8"
                    : "gap-sp-6 px-sp-12"
                );

                if (item.parent) {
                  const isOpen = openDesktopSubnavHref === item.href;
                  return (
                    <button
                      key={item.href}
                      type="button"
                      className={commonClasses}
                      aria-expanded={isOpen}
                      aria-haspopup="menu"
                      onMouseEnter={() => setOpenDesktopSubnavHref(item.href)}
                      onFocus={() => setOpenDesktopSubnavHref(item.href)}
                      onClick={() => setOpenDesktopSubnavHref(isOpen ? null : item.href)}
                    >
                      <span className="inline-flex items-center pb-sp-1">{item.label}</span>
                      <IconChevronDown size="md" />
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={commonClasses}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="inline-flex items-center pb-sp-1">{item.label}</span>
                    {item.tagText ? (
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-10 px-sp-6 text-[11px] font-semibold leading-[15px] tracking-[0.44px] text-purple-80">
                        {item.tagText}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-sp-16">
            <Button variant="tertiary" size="sm">
              {secondaryCtaLabel}
            </Button>
            <Button variant="primary" size="sm">
              {primaryCtaLabel}
            </Button>
          </div>

          <button
            type="button"
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-[8px] p-sp-6 lg:hidden",
              computedMobileMenuButtonState === "pressed"
                ? "bg-grey-20 text-grey-100"
                : "bg-transparent text-grey-100 cursor-pointer"
            )}
            aria-label={mobileMenuLabel}
            aria-expanded={isMobileMenuOpen}
            aria-controls={mobileMenuId}
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <IconX size="lg" /> : <IconMenu size="lg" />}
          </button>
        </div>

        {isMobileMenuOpen ? (
          <div id={mobileMenuId} className="border-t border-grey-20 px-sp-16 py-sp-12 lg:hidden">
            <nav className="flex flex-col gap-sp-4" aria-label="Primary navigation mobile">
              {items.map((item) => {
                const isActive = activeHref === item.href;
                return (
                  <Link
                    key={`mobile-${item.href}`}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      "inline-flex h-10 items-center overflow-hidden rounded-[8px] ds-text-body-lg font-semibold transition-colors",
                      "text-grey-100 hover:bg-grey-10 active:bg-grey-20",
                      isActive && "bg-grey-10 text-grey-100",
                      item.parent
                        ? "gap-sp-4 pl-sp-12 pr-sp-8"
                        : "gap-sp-6 px-sp-12"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="inline-flex items-center pb-sp-1">{item.label}</span>
                    {item.parent ? <IconChevronDown size="md" /> : null}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-sp-12 flex items-center gap-sp-8">
              <Button variant="tertiary" size="sm" className="flex-1">
                {secondaryCtaLabel}
              </Button>
              <Button variant="primary" size="sm" className="flex-1">
                {primaryCtaLabel}
              </Button>
            </div>
          </div>
        ) : null}
      </header>

      {openDesktopSubnavHref ? (
        <div className="mt-sp-8 hidden justify-center lg:flex">
          {openDesktopSubnavKind === "resources" ? (
            <SubNavigationResourcesDesktop />
          ) : openDesktopSubnavKind === "about" ? (
            <SubNavigationAboutDesktop />
          ) : (
            <SubNavigationSolutionsDesktop />
          )}
        </div>
      ) : null}
    </div>
  );
}

export { TopNavigation };
