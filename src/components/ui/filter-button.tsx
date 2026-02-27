"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { IconChevronDown, IconChevronUp, IconXMarkFilled } from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterButtonProps {
  label: string;
  selectedValues?: string[];
  options?: FilterOption[];
  onSelectionChange?: (values: string[]) => void;
  onClear?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showSearch?: boolean;
  searchPlaceholder?: string;
  disabled?: boolean;
  previewState?: "enabled" | "hover" | "pressed" | "disabled";
  previewFilled?: boolean;
  previewCount?: number;
  className?: string;
  id?: string;
}

// ─── Badge ────────────────────────────────────────────────────────────────────

function FilterBadge({ count, disabled }: { count: number; disabled?: boolean }) {
  return (
    <span
      aria-label={`${count} selected`}
      className={cn(
        "inline-flex size-5 shrink-0 items-center justify-center rounded-full",
        disabled ? "bg-grey-30" : "bg-grey-60"
      )}
    >
      <span className="ds-text-notification font-medium leading-none text-white">
        {count}
      </span>
    </span>
  );
}

// ─── Dropdown menu ────────────────────────────────────────────────────────────

interface FilterMenuProps {
  options: FilterOption[];
  selectedValues: string[];
  searchQuery: string;
  showSearch: boolean;
  searchPlaceholder: string;
  searchRef: React.RefObject<HTMLInputElement | null>;
  onSearchChange: (query: string) => void;
  onToggle: (value: string) => void;
  menuId: string;
}

function FilterMenu({
  options,
  selectedValues,
  searchQuery,
  showSearch,
  searchPlaceholder,
  searchRef,
  onSearchChange,
  onToggle,
  menuId,
}: FilterMenuProps) {
  const filtered = searchQuery.trim()
    ? options.filter((o) =>
        o.label.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : options;

  return (
    <div
      id={menuId}
      role="listbox"
      aria-multiselectable="true"
      aria-label="Filter options"
      className={cn(
        "absolute left-0 top-full z-20 mt-sp-4",
        "w-[216px] overflow-hidden rounded-[8px] bg-white",
        "shadow-[0px_4px_8px_0px_var(--color-t-grey-10),0px_1px_2px_1px_var(--color-t-grey-15)]"
      )}
    >
      {showSearch && (
        <div className="px-sp-8 pt-sp-8 pb-0">
          <div className="flex h-9 items-center gap-sp-8 rounded-[8px] border-2 border-purple-70 bg-white pl-sp-8 pr-sp-12">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="shrink-0 text-grey-60"
            >
              <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M13.5 13.5L16.5 16.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent p-0 text-[15px] font-medium leading-normal text-grey-100 placeholder:text-grey-60 outline-none"
              aria-label="Search filter options"
            />
          </div>
        </div>
      )}

      <div className="flex gap-sp-4 pl-sp-8 pr-sp-4 py-sp-8">
        <div
          className={cn(
            "flex min-w-0 flex-1 flex-col gap-sp-2",
            "max-h-[248px] overflow-y-auto",
            "[scrollbar-width:thin] [scrollbar-color:var(--color-grey-20)_transparent]",
            "[&::-webkit-scrollbar]:w-[6px]",
            "[&::-webkit-scrollbar-track]:rounded-full",
            "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-grey-20"
          )}
        >
          {filtered.length === 0 && (
            <div className="flex h-[30px] items-center px-sp-8 text-[13px] font-medium leading-normal tracking-[0.04em] text-grey-60">
              No results
            </div>
          )}
          {filtered.map((option) => {
            const isChecked = selectedValues.includes(option.value);
            return (
              <div
                key={option.value}
                role="option"
                aria-selected={isChecked}
                tabIndex={0}
                onClick={() => onToggle(option.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onToggle(option.value);
                  }
                }}
                className="flex h-[30px] w-full cursor-pointer items-center gap-sp-8 rounded-[4px] px-sp-8 hover:bg-grey-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-70/50"
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => onToggle(option.value)}
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="min-w-0 flex-1 select-none overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-medium leading-normal text-grey-100">
                  {option.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

function FilterButton({
  label,
  selectedValues: controlledSelectedValues,
  options = [],
  onSelectionChange,
  onClear,
  open,
  onOpenChange,
  showSearch = true,
  searchPlaceholder = "Search...",
  previewState,
  previewFilled,
  previewCount,
  disabled,
  className,
  id,
}: FilterButtonProps) {
  const generatedId = React.useId();
  const buttonId = id ?? generatedId;
  const menuId = `${buttonId}-menu`;

  const isControlledValues = controlledSelectedValues !== undefined;
  const [internalSelectedValues, setInternalSelectedValues] = React.useState<string[]>([]);
  const selectedValues = isControlledValues ? controlledSelectedValues! : internalSelectedValues;

  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlledOpen = open !== undefined;
  const isOpen = isControlledOpen ? open : internalOpen;

  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);
  const [isBadgeHovered, setIsBadgeHovered] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const searchRef = React.useRef<HTMLInputElement | null>(null);

  const hasStaticState = previewState !== undefined;
  const isDisabled = disabled || previewState === "disabled";

  const count = previewCount ?? selectedValues.length;
  const isFilled = previewFilled ?? count > 0;

  const selectedLabel =
    count === 1
      ? options.find((o) => o.value === selectedValues[0])?.label
      : undefined;
  const displayLabel = count === 1 ? (selectedLabel ?? label) : label;

  const computedState =
    previewState ??
    (isDisabled
      ? "disabled"
      : isPressed
        ? "pressed"
        : isHovered
          ? "hover"
          : "enabled");

  const pillClasses = cn(
    "relative inline-flex h-9 shrink-0 items-center overflow-hidden rounded-[8px]",
    "outline-none transition-[box-shadow,background-color]",
    computedState === "enabled" && !isFilled && !isOpen &&
      "bg-white shadow-[0px_1px_1px_0px_var(--color-t-grey-10),0px_1px_2px_0px_var(--color-t-grey-10),0px_0px_1px_0px_var(--color-t-grey-90)]",
    !isFilled && isOpen &&
      "bg-grey-20 shadow-[0px_1px_1px_0px_var(--color-t-grey-10),0px_1px_2px_0px_var(--color-t-grey-10),0px_0px_1px_0px_var(--color-t-grey-90)]",
    computedState === "hover" && !isFilled && !isOpen &&
      "bg-grey-10 shadow-[0px_1px_1px_0px_var(--color-t-grey-10),0px_1px_4px_0px_var(--color-t-grey-20),0px_0px_1px_0px_var(--color-t-grey-90)]",
    computedState === "pressed" && !isFilled && !isOpen &&
      "bg-grey-10 shadow-[0px_0px_1px_0px_var(--color-t-grey-90)]",
    (computedState === "enabled" || computedState === "hover" || computedState === "pressed") && isFilled &&
      "bg-grey-10 shadow-[0px_1px_1px_0px_var(--color-t-grey-10),0px_1px_2px_0px_var(--color-t-grey-10),0px_0px_1px_0px_var(--color-t-grey-90)]",
    computedState === "disabled" &&
      "bg-white border border-grey-20 shadow-none",
    !hasStaticState && !isDisabled && !isFilled && !isOpen && [
      "hover:bg-grey-10",
      "hover:shadow-[0px_1px_1px_0px_var(--color-t-grey-10),0px_1px_4px_0px_var(--color-t-grey-20),0px_0px_1px_0px_var(--color-t-grey-90)]",
      "active:shadow-[0px_0px_1px_0px_var(--color-t-grey-90)]",
    ],
    !hasStaticState && !isDisabled && isFilled &&
      "hover:shadow-[0px_1px_1px_0px_var(--color-t-grey-10),0px_1px_4px_0px_var(--color-t-grey-20),0px_0px_1px_0px_var(--color-t-grey-90)]",
    isDisabled && "cursor-default pointer-events-none",
    className
  );

  // Close on outside click
  React.useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        if (!isControlledOpen) setInternalOpen(false);
        setSearchQuery("");
        onOpenChange?.(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen, isControlledOpen, onOpenChange]);

  // Auto-focus search when menu opens
  React.useEffect(() => {
    if (!isOpen || !showSearch) return;
    requestAnimationFrame(() => searchRef.current?.focus());
  }, [isOpen, showSearch]);

  const openMenu = () => {
    if (isDisabled || hasStaticState) return;
    if (!isControlledOpen) setInternalOpen(true);
    onOpenChange?.(true);
  };

  const closeMenu = () => {
    if (!isControlledOpen) setInternalOpen(false);
    setSearchQuery("");
    onOpenChange?.(false);
  };

  const handleToggle = (value: string) => {
    const next = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    if (!isControlledValues) setInternalSelectedValues(next);
    onSelectionChange?.(next);
  };

  const handleLabelClick = () => {
    if (isDisabled || hasStaticState) return;
    isOpen ? closeMenu() : openMenu();
  };

  const handleClearClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDisabled || hasStaticState) return;
    if (!isControlledValues) setInternalSelectedValues([]);
    onSelectionChange?.([]);
    onClear?.();
    closeMenu();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isDisabled || hasStaticState) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      isOpen ? closeMenu() : openMenu();
    }
    if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      closeMenu();
    }
  };

  const handleClearKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isControlledValues) setInternalSelectedValues([]);
      onSelectionChange?.([]);
      onClear?.();
      closeMenu();
    }
    if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      closeMenu();
    }
  };

  return (
    <div ref={rootRef} className="relative inline-flex">
      <div
        data-slot="filter-button"
        data-state={computedState}
        data-filled={isFilled ? "true" : "false"}
        className={pillClasses}
        onMouseEnter={() => { if (!hasStaticState) setIsHovered(true); }}
        onMouseLeave={() => { if (!hasStaticState) { setIsHovered(false); setIsPressed(false); } }}
      >
        {/* Label zone */}
        <button
          type="button"
          id={buttonId}
          disabled={isDisabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={isOpen ? menuId : undefined}
          aria-label={
            isFilled
              ? count === 1
                ? `${label} filter, ${selectedLabel ?? selectedValues[0]} selected`
                : `${label} filter, ${count} selected`
              : undefined
          }
          className={cn(
            "inline-flex h-full items-center outline-none cursor-pointer",
            "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-70/50",
            !isFilled ? "pl-sp-14 pr-sp-10 gap-sp-4" : "pl-sp-14 pr-sp-4",
            isDisabled && "cursor-default pointer-events-none"
          )}
          onClick={handleLabelClick}
          onKeyDown={handleKeyDown}
          onMouseDown={() => { if (!hasStaticState && !isDisabled) setIsPressed(true); }}
          onMouseUp={() => { if (!hasStaticState) setIsPressed(false); }}
        >
          <span
            className={cn(
              "ds-text-ui-button-md font-medium whitespace-nowrap leading-normal",
              isDisabled ? "text-grey-30" : "text-grey-100"
            )}
          >
            {isFilled ? displayLabel : label}
          </span>
          {!isFilled && (
            isOpen ? (
              <IconChevronUp
                size="md"
                aria-hidden="true"
                className={cn("shrink-0", isDisabled ? "text-grey-30" : "text-grey-100")}
              />
            ) : (
              <IconChevronDown
                size="md"
                aria-hidden="true"
                className={cn("shrink-0", isDisabled ? "text-grey-30" : "text-grey-100")}
              />
            )
          )}
        </button>

        {/* Clear zone — filled state only */}
        {isFilled && (
          <button
            type="button"
            disabled={isDisabled}
            aria-label={`Clear ${label} filter`}
            className={cn(
              "inline-flex h-full items-center pr-sp-10 pl-sp-0 outline-none cursor-pointer",
              "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-70/50",
              isDisabled && "cursor-default pointer-events-none"
            )}
            onClick={handleClearClick}
            onKeyDown={handleClearKeyDown}
            onMouseEnter={() => { if (!hasStaticState && !isDisabled) setIsBadgeHovered(true); }}
            onMouseLeave={() => { if (!hasStaticState) setIsBadgeHovered(false); }}
          >
            <span className="inline-flex size-5 items-center justify-center">
              {count > 1 && !isBadgeHovered ? (
                <FilterBadge count={count} disabled={isDisabled} />
              ) : (
                <IconXMarkFilled
                  size="md"
                  aria-hidden="true"
                  className={cn("shrink-0", isDisabled ? "text-grey-30" : "text-grey-60")}
                />
              )}
            </span>
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <FilterMenu
          options={options}
          selectedValues={selectedValues}
          searchQuery={searchQuery}
          showSearch={showSearch}
          searchPlaceholder={searchPlaceholder}
          searchRef={searchRef}
          onSearchChange={setSearchQuery}
          onToggle={handleToggle}
          menuId={menuId}
        />
      )}
    </div>
  );
}

export { FilterButton };
