"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { IconCheck, IconChevronDown, IconChevronUp, IconSearch } from "@/components/icons";

type DropdownSize = "small" | "medium";
type DropdownVisualStyle = "default" | "inline";
type DropdownVisualState = "enabled" | "hover" | "pressed" | "focus" | "active" | "disabled";
type MenuAlignment = "left" | "right";

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style" | "defaultValue" | "value" | "onChange"> {
  size?: DropdownSize;
  style?: DropdownVisualStyle;
  /** Docs-only static visual override. Avoid in product usage. */
  previewState?: DropdownVisualState;
  open?: boolean;
  menuAlignment?: MenuAlignment;
  label?: string;
  helperText?: string;
  placeholder?: string;
  options?: DropdownOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  showSearch?: boolean;
  searchPlaceholder?: string;
  containerClassName?: string;
  children?: React.ReactNode;
}

const DEFAULT_OPTIONS: DropdownOption[] = [
  { label: "Option", value: "option-1" },
  { label: "Option", value: "option-2" },
  { label: "Option", value: "option-3" },
  { label: "Option", value: "option-4" },
  { label: "Option", value: "option-5" },
];

const sizeClassMap: Record<DropdownSize, string> = {
  small: "h-9",
  medium: "h-10",
};

const visualStateClasses: Record<DropdownVisualState, string> = {
  enabled:
    "bg-white shadow-[0px_2px_1px_-1px_var(--color-t-grey-10),0px_1px_2px_0px_var(--color-t-grey-15),0px_0px_1px_0px_var(--color-t-grey-90)]",
  hover:
    "bg-white shadow-[0px_2px_1px_-1px_var(--color-t-grey-10),0px_1px_2px_0px_var(--color-t-grey-30),0px_0px_1px_0px_var(--color-t-grey-90)]",
  pressed: "bg-white shadow-[0px_0px_1px_0px_var(--color-t-grey-90)]",
  focus: "bg-white shadow-[inset_0_0_0_2px_var(--color-focus,#4d24c7)]",
  active: "bg-white shadow-[inset_0_0_0_2px_var(--color-focus,#4d24c7)]",
  disabled: "bg-grey-10 border border-grey-20 shadow-none",
};

type DropdownContextValue = {
  triggerId: string;
  labelId: string;
  menuId: string;
  searchId: string;
  rootRef: React.RefObject<HTMLDivElement | null>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  searchRef: React.RefObject<HTMLInputElement | null>;
  optionRefs: React.MutableRefObject<Array<HTMLButtonElement | null>>;
  size: DropdownSize;
  style: DropdownVisualStyle;
  menuAlignment: MenuAlignment;
  label?: string;
  helperText?: string;
  placeholder: string;
  searchPlaceholder: string;
  showSearch: boolean;
  hasStaticState: boolean;
  isDisabled: boolean;
  isOpen: boolean;
  isSelected: boolean;
  selectedValue: string;
  selectedLabel?: string;
  displayText: string;
  computedState: DropdownVisualState;
  triggerTypography: string;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPressed: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  filteredOptions: DropdownOption[];
  activeIndex: number;
  activeOptionId?: string;
  openMenu: () => void;
  closeMenu: (focusTrigger?: boolean) => void;
  moveActive: (direction: 1 | -1) => void;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  commitValue: (nextValue: string) => void;
  handleTriggerKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  handleMenuKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  triggerClasses: string;
  triggerButtonProps: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "defaultValue" | "onChange" | "className">;
  eventHandlers: {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onFocus?: React.FocusEventHandler<HTMLButtonElement>;
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
    onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
    onMouseUp?: React.MouseEventHandler<HTMLButtonElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  };
  searchQuery: string;
};

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown compound components must be used within Dropdown.Root or Dropdown.");
  }
  return context;
}

function DropdownLabel({ className }: { className?: string }) {
  const { label, labelId, style } = useDropdownContext();
  if (!label) {
    return null;
  }

  return (
    <span
      id={labelId}
      className={cn(
        style === "inline" ? "pb-sp-2 text-[15px] font-medium leading-normal text-grey-100" : "text-[15px] font-medium leading-normal text-grey-100",
        className
      )}
    >
      {label}
    </span>
  );
}

function DropdownControl({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <div className={cn("relative", className)}>{children}</div>;
}

function DropdownTrigger({ className }: { className?: string }) {
  const {
    triggerRef,
    triggerId,
    menuId,
    label,
    labelId,
    isOpen,
    activeOptionId,
    placeholder,
    computedState,
    isDisabled,
    hasStaticState,
    selectedLabel,
    displayText,
    triggerTypography,
    setIsHovered,
    setIsPressed,
    setIsFocused,
    triggerClasses,
    triggerButtonProps,
    handleTriggerKeyDown,
    openMenu,
    closeMenu,
    eventHandlers,
  } = useDropdownContext();

  return (
    <button
      ref={triggerRef}
      type="button"
      id={triggerId}
      role="combobox"
      aria-labelledby={label ? labelId : undefined}
      aria-expanded={isOpen}
      aria-controls={menuId}
      aria-haspopup="listbox"
      aria-activedescendant={activeOptionId}
      aria-label={!label ? placeholder : undefined}
      data-slot="dropdown-trigger"
      data-state={computedState}
      disabled={isDisabled}
      className={cn(triggerClasses, className)}
      onClick={(event) => {
        if (isDisabled || hasStaticState) {
          eventHandlers.onClick?.(event);
          return;
        }

        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }
        eventHandlers.onClick?.(event);
      }}
      onKeyDown={handleTriggerKeyDown}
      onMouseEnter={(event) => {
        if (!hasStaticState) {
          setIsHovered(true);
        }
        eventHandlers.onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        if (!hasStaticState) {
          setIsHovered(false);
          setIsPressed(false);
        }
        eventHandlers.onMouseLeave?.(event);
      }}
      onMouseDown={(event) => {
        if (!hasStaticState && !isDisabled) {
          setIsPressed(true);
        }
        eventHandlers.onMouseDown?.(event);
      }}
      onMouseUp={(event) => {
        if (!hasStaticState) {
          setIsPressed(false);
        }
        eventHandlers.onMouseUp?.(event);
      }}
      onFocus={(event) => {
        if (!hasStaticState) {
          setIsFocused(true);
        }
        eventHandlers.onFocus?.(event);
      }}
      onBlur={(event) => {
        if (!hasStaticState) {
          setIsFocused(false);
          setIsPressed(false);
        }
        eventHandlers.onBlur?.(event);
      }}
      {...triggerButtonProps}
    >
      <span
        className={cn(
          "min-w-0 flex-1 overflow-hidden text-left text-ellipsis whitespace-nowrap",
          triggerTypography,
          isDisabled ? "text-grey-30" : selectedLabel ? "text-grey-100" : "text-grey-60"
        )}
      >
        {displayText}
      </span>
      <span className={cn("inline-flex size-5 items-center justify-center", isDisabled ? "text-grey-40" : "text-grey-70")}>
        {isOpen || computedState === "active" ? <IconChevronUp size="md" /> : <IconChevronDown size="md" />}
      </span>
    </button>
  );
}

function DropdownSearch({ className }: { className?: string }) {
  const {
    showSearch,
    searchRef,
    searchId,
    searchQuery,
    setSearchQuery,
    searchPlaceholder,
  } = useDropdownContext();

  if (!showSearch) {
    return null;
  }

  return (
    <div className={cn("px-sp-8 pt-sp-8 pb-0", className)}>
      <div className="flex h-9 items-center gap-sp-8 rounded-[8px] border-2 border-purple-70 bg-white pl-sp-8 pr-sp-12">
        <IconSearch size="md" className="text-grey-60" />
        <input
          ref={searchRef}
          id={searchId}
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="w-full bg-transparent p-0 ds-text-body-lg font-regular text-grey-100 placeholder:text-grey-60 outline-none"
          placeholder={searchPlaceholder}
          aria-label="Search options"
        />
      </div>
    </div>
  );
}

function DropdownOptions({ className }: { className?: string }) {
  const {
    label,
    labelId,
    filteredOptions,
    activeIndex,
    selectedValue,
    hasStaticState,
    optionRefs,
    setActiveIndex,
    commitValue,
    menuId,
  } = useDropdownContext();

  return (
    <div className="flex gap-sp-4 pl-sp-8 pr-sp-4 py-sp-8">
      <div
        role="listbox"
        aria-labelledby={label ? labelId : undefined}
        className={cn(
          "flex min-w-0 flex-1 flex-col gap-sp-2 pr-sp-4 max-h-[248px] overflow-y-auto",
          "[scrollbar-width:thin] [scrollbar-color:var(--color-grey-20)_transparent]",
          "[&::-webkit-scrollbar]:w-[6px]",
          "[&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-grey-20",
          "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-grey-20",
          className
        )}
      >
        {filteredOptions.length === 0 && (
          <div className="flex h-[30px] items-center px-sp-8 text-[13px] font-medium leading-normal tracking-[0.04em] text-grey-60">
            No results
          </div>
        )}

        {filteredOptions.map((option, index) => {
          const optionSelected = selectedValue === option.value;
          const optionActive = index === activeIndex;

          return (
            <button
              key={option.value}
              id={`${menuId}-option-${index}`}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              type="button"
              role="option"
              tabIndex={-1}
              aria-selected={optionSelected}
              className={cn(
                "flex h-[30px] w-full items-center gap-sp-8 overflow-hidden rounded-[4px] px-sp-8",
                optionSelected || optionActive ? "bg-grey-10" : "bg-white",
                !hasStaticState && "hover:bg-grey-10"
              )}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => commitValue(option.value)}
            >
              <span className="min-w-0 flex-1 overflow-hidden text-left text-ellipsis whitespace-nowrap text-[15px] font-medium leading-normal text-grey-100">
                {option.label}
              </span>
              {optionSelected && <IconCheck size="sm" className="text-grey-100" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DropdownMenu({ children, className }: { children?: React.ReactNode; className?: string }) {
  const { isOpen, menuId, label, labelId, style, menuAlignment, handleMenuKeyDown } = useDropdownContext();

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id={menuId}
      aria-labelledby={label ? labelId : undefined}
      className={cn(
        "absolute top-full z-20 mt-sp-4 overflow-hidden rounded-[12px] bg-white",
        "shadow-[0px_1px_2px_1px_var(--color-t-grey-10),0px_4px_8px_0px_var(--color-t-grey-15)]",
        style === "inline" ? "w-[256px]" : "w-full",
        menuAlignment === "right" ? "right-0" : "left-0",
        className
      )}
      onKeyDown={handleMenuKeyDown}
    >
      {children ?? (
        <>
          <DropdownSearch />
          <DropdownOptions />
        </>
      )}
    </div>
  );
}

function DropdownHelperText({ className }: { className?: string }) {
  const { helperText, isDisabled, style } = useDropdownContext();

  if (!helperText || style === "inline") {
    return null;
  }

  return (
    <p className={cn("text-[13px] font-normal leading-normal tracking-[0.04em]", isDisabled ? "text-grey-40" : "text-grey-70", className)}>
      {helperText}
    </p>
  );
}

function DropdownDefaultComposition() {
  const { style } = useDropdownContext();

  if (style === "inline") {
    return (
      <>
        <DropdownLabel />
        <DropdownControl>
          <DropdownTrigger />
          <DropdownMenu />
        </DropdownControl>
      </>
    );
  }

  return (
    <>
      <DropdownLabel />
      <DropdownControl>
        <DropdownTrigger />
        <DropdownMenu />
      </DropdownControl>
      <DropdownHelperText />
    </>
  );
}

function DropdownRoot({
  className,
  containerClassName,
  size = "medium",
  style = "default",
  previewState,
  open,
  menuAlignment = "left",
  label = "Label",
  helperText = "Helper text",
  placeholder = "Choose an option",
  options = DEFAULT_OPTIONS,
  value,
  defaultValue,
  onValueChange,
  onOpenChange,
  showSearch = true,
  searchPlaceholder = "Search...",
  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  disabled,
  onKeyDown,
  children,
  id,
  ...props
}: DropdownProps) {
  const generatedId = React.useId();
  const triggerId = id ?? generatedId;
  const labelId = `${triggerId}-label`;
  const menuId = `${triggerId}-menu`;
  const searchId = `${triggerId}-search`;

  const isControlledValue = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const selectedValue = isControlledValue ? value : internalValue;

  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlledOpen = open !== undefined;
  const isOpen = isControlledOpen ? open : internalOpen;

  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const searchRef = React.useRef<HTMLInputElement | null>(null);
  const optionRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const hasStaticState = previewState !== undefined;
  const isDisabled = disabled || previewState === "disabled";

  const filteredOptions = React.useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return options;
    }

    return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery));
  }, [options, searchQuery]);

  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue]
  );

  const selectedLabel = selectedOption?.label;
  const displayText = selectedLabel ?? placeholder;

  const computedState: DropdownVisualState =
    previewState ??
    (isDisabled
      ? "disabled"
      : isFocused
        ? "focus"
        : isPressed
          ? "pressed"
          : isHovered
            ? "hover"
            : "enabled");

  const triggerTypography =
    style === "inline"
      ? "text-[15px] font-medium leading-normal"
      : size === "small"
        ? "text-[13px] font-medium leading-normal tracking-[0.04em]"
        : "text-[14px] font-medium leading-normal";

  const selectedIndex = filteredOptions.findIndex((option) => option.value === selectedValue);

  React.useEffect(() => {
    if (!isOpen) {
      setActiveIndex(-1);
      optionRefs.current = [];
      return;
    }

    setActiveIndex((previous) => {
      if (previous >= 0 && previous < filteredOptions.length) {
        return previous;
      }
      if (selectedIndex >= 0) {
        return selectedIndex;
      }
      return -1;
    });
  }, [isOpen, filteredOptions.length, selectedIndex]);

  React.useEffect(() => {
    if (!isOpen || activeIndex < 0) {
      return;
    }

    optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeIndex]);

  // Auto-focus the search input when the menu opens (if search is enabled)
  React.useEffect(() => {
    if (!isOpen || !showSearch) {
      return;
    }
    requestAnimationFrame(() => {
      searchRef.current?.focus();
    });
  }, [isOpen, showSearch]);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        if (!isControlledOpen) {
          setInternalOpen(false);
        }
        setSearchQuery("");
        onOpenChange?.(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen, isControlledOpen, onOpenChange]);

  const openMenu = React.useCallback(() => {
    if (isDisabled || hasStaticState) {
      return;
    }

    if (!isControlledOpen) {
      setInternalOpen(true);
    }
    onOpenChange?.(true);
  }, [isControlledOpen, isDisabled, hasStaticState, onOpenChange]);

  const closeMenu = React.useCallback((focusTrigger = true) => {
    if (!isControlledOpen) {
      setInternalOpen(false);
    }
    setSearchQuery("");
    onOpenChange?.(false);
    if (focusTrigger) {
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, [isControlledOpen, onOpenChange]);

  const commitValue = React.useCallback(
    (nextValue: string) => {
      if (!isControlledValue) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
      closeMenu();
    },
    [isControlledValue, onValueChange, closeMenu]
  );

  const moveActive = React.useCallback(
    (direction: 1 | -1) => {
      if (filteredOptions.length === 0) {
        setActiveIndex(-1);
        return;
      }

      setActiveIndex((previous) => {
        if (previous < 0 || previous >= filteredOptions.length) {
          return direction === 1 ? 0 : filteredOptions.length - 1;
        }

        const next = previous + direction;
        if (next < 0) {
          return filteredOptions.length - 1;
        }
        if (next >= filteredOptions.length) {
          return 0;
        }

        return next;
      });
    },
    [filteredOptions.length]
  );

  const activeOptionId =
    isOpen && activeIndex >= 0 && activeIndex < filteredOptions.length
      ? `${menuId}-option-${activeIndex}`
      : undefined;

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (isDisabled || hasStaticState) {
      onKeyDown?.(event);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!isOpen) {
        openMenu();
      } else {
        moveActive(1);
      }
      onKeyDown?.(event);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) {
        openMenu();
      } else {
        moveActive(-1);
      }
      onKeyDown?.(event);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!isOpen) {
        openMenu();
      } else if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
        commitValue(filteredOptions[activeIndex].value);
      }
      onKeyDown?.(event);
      return;
    }

    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      closeMenu();
      onKeyDown?.(event);
      return;
    }

    if (event.key === "Home" && isOpen) {
      event.preventDefault();
      setActiveIndex(filteredOptions.length > 0 ? 0 : -1);
      onKeyDown?.(event);
      return;
    }

    if (event.key === "End" && isOpen) {
      event.preventDefault();
      setActiveIndex(filteredOptions.length > 0 ? filteredOptions.length - 1 : -1);
      onKeyDown?.(event);
      return;
    }

    onKeyDown?.(event);
  };

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveActive(1);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActive(-1);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(filteredOptions.length > 0 ? 0 : -1);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(filteredOptions.length > 0 ? filteredOptions.length - 1 : -1);
      return;
    }

    if (event.key === "Enter" && activeIndex >= 0 && activeIndex < filteredOptions.length) {
      event.preventDefault();
      commitValue(filteredOptions[activeIndex].value);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
    }
  };

  const triggerClasses = cn(
    "relative inline-flex min-w-0 appearance-none items-center overflow-hidden rounded-[8px] pl-sp-12 pr-sp-10",
    "transition-[background-color,border-color,box-shadow,color] outline-none",
    style === "default" ? `w-full ${sizeClassMap[size]} gap-sp-10` : "h-9 gap-sp-10",
    style === "inline" && (selectedLabel ? "w-[148px]" : "w-[222px]"),
    visualStateClasses[computedState],
    !hasStaticState && !isDisabled && "hover:shadow-[0px_2px_1px_-1px_var(--color-t-grey-10),0px_1px_2px_0px_var(--color-t-grey-30),0px_0px_1px_0px_var(--color-t-grey-90)] active:shadow-[0px_0px_1px_0px_var(--color-t-grey-90)] active:[transform:none] focus-visible:shadow-[inset_0_0_0_2px_var(--color-focus,#4d24c7)]",
    isDisabled && "pointer-events-none cursor-default",
    className
  );

  const contextValue: DropdownContextValue = {
    triggerId,
    labelId,
    menuId,
    searchId,
    rootRef,
    triggerRef,
    searchRef,
    optionRefs,
    size,
    style,
    menuAlignment,
    label,
    helperText,
    placeholder,
    searchPlaceholder,
    showSearch,
    hasStaticState,
    isDisabled,
    isOpen,
    isSelected: Boolean(selectedLabel),
    selectedValue,
    selectedLabel,
    displayText,
    computedState,
    triggerTypography,
    setIsHovered,
    setIsPressed,
    setIsFocused,
    filteredOptions,
    activeIndex,
    activeOptionId,
    openMenu,
    closeMenu,
    moveActive,
    setActiveIndex,
    setSearchQuery,
    commitValue,
    handleTriggerKeyDown,
    handleMenuKeyDown,
    triggerClasses,
    triggerButtonProps: props,
    eventHandlers: {
      onClick,
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      onKeyDown,
    },
    searchQuery,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      {style === "inline" ? (
        <div
          ref={rootRef}
          data-slot="dropdown"
          data-style={style}
          className={cn("relative inline-flex items-center gap-sp-12", containerClassName)}
        >
          {children ?? <DropdownDefaultComposition />}
        </div>
      ) : (
        <div
          ref={rootRef}
          data-slot="dropdown"
          data-style={style}
          className={cn("relative flex w-[256px] flex-col gap-sp-6", containerClassName)}
        >
          {children ?? <DropdownDefaultComposition />}
        </div>
      )}
    </DropdownContext.Provider>
  );
}

type DropdownCompound = ((props: DropdownProps) => React.JSX.Element) & {
  Root: typeof DropdownRoot;
  Label: typeof DropdownLabel;
  Control: typeof DropdownControl;
  Trigger: typeof DropdownTrigger;
  Menu: typeof DropdownMenu;
  Search: typeof DropdownSearch;
  Options: typeof DropdownOptions;
  HelperText: typeof DropdownHelperText;
};

const Dropdown = DropdownRoot as DropdownCompound;

Dropdown.Root = DropdownRoot;
Dropdown.Label = DropdownLabel;
Dropdown.Control = DropdownControl;
Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;
Dropdown.Search = DropdownSearch;
Dropdown.Options = DropdownOptions;
Dropdown.HelperText = DropdownHelperText;

export {
  Dropdown,
  DropdownRoot,
  DropdownLabel,
  DropdownControl,
  DropdownTrigger,
  DropdownMenu,
  DropdownSearch,
  DropdownOptions,
  DropdownHelperText,
};

export type { DropdownSize, DropdownVisualStyle, DropdownVisualState, MenuAlignment };
