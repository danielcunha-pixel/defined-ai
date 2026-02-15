import * as React from "react";

import { cn } from "@/lib/utils";
import { IconAlertCircleFilled } from "@/components/icons";

type InputSize = "small" | "medium" | "large";
type InputState = "enabled" | "hover" | "pressed" | "disabled" | "error" | "read-only";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  state?: InputState;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  /** Forces filled visual state for static previews when no value is present. */
  filled?: boolean;
  /** Forces active visual state for static previews. */
  active?: boolean;
  containerClassName?: string;
}

const sizeClassMap: Record<InputSize, string> = {
  small: "h-9",
  medium: "h-10",
  large: "h-11",
};

function Input({
  className,
  containerClassName,
  size = "small",
  state,
  label,
  helperText,
  errorMessage = "Error message",
  filled = false,
  active = false,
  defaultValue,
  value,
  onFocus,
  onBlur,
  disabled,
  readOnly,
  "aria-invalid": ariaInvalid,
  ...props
}: InputProps) {
  const generatedId = React.useId();
  const inputId = props.id ?? generatedId;
  const [isFocused, setIsFocused] = React.useState(false);
  const hasValue =
    typeof value === "string"
      ? value.length > 0
      : typeof defaultValue === "string"
        ? defaultValue.length > 0
        : false;

  const effectiveState: InputState =
    state ??
    (disabled
      ? "disabled"
      : readOnly
        ? "read-only"
        : ariaInvalid
          ? "error"
          : "enabled");

  const isDisabled = effectiveState === "disabled";
  const isReadOnly = effectiveState === "read-only";
  const isError = effectiveState === "error";
  const isPressed = effectiveState === "pressed";
  const isHoverPreview = effectiveState === "hover";
  const showHelper = !isError && Boolean(helperText);
  const showError = isError;
  const isFilled = filled || hasValue;
  const isActive = active || isFocused;
  const hasStaticState = state !== undefined;

  const inputAreaClasses = cn(
    "relative flex w-full items-center rounded-[8px] px-sp-12 py-0 transition-[background-color,border-color,color,box-shadow]",
    sizeClassMap[size],
    "text-[15px] leading-normal",
    isDisabled && "bg-grey-10 text-grey-30 shadow-[0_0_1px_0_var(--color-t-grey-90)]",
    isReadOnly && "bg-grey-10 text-grey-100",
    !isDisabled && !isReadOnly && "bg-white",
    !isDisabled && !isReadOnly && !isError && !isActive && !isHoverPreview && "border border-grey-30",
    !isDisabled && !isReadOnly && !isError && isHoverPreview && "border border-grey-50",
    !isDisabled && !isReadOnly && !isError && isPressed && !isActive && "border border-grey-30",
    !isDisabled && !isReadOnly && !isError && isActive && "border-2 border-purple-70",
    isError && "border-2 border-red-60",
    !hasStaticState &&
      !isDisabled &&
      !isReadOnly &&
      !isError &&
      !isFocused &&
      "hover:border-grey-50 active:border-grey-30 focus-within:border-2 focus-within:border-purple-70",
  );

  return (
    <div
      data-slot="input"
      className={cn("flex w-full flex-col gap-sp-6", containerClassName)}
    >
      {label && (
        <label htmlFor={inputId} className="w-full text-[15px] font-medium leading-normal text-grey-100">
          {label}
        </label>
      )}

      <div className={inputAreaClasses}>
        <input
          {...props}
          id={inputId}
          value={value}
          defaultValue={defaultValue}
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-invalid={isError || ariaInvalid}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            "w-full min-w-0 bg-transparent p-0 text-[15px] font-normal leading-normal text-grey-100 outline-none",
            "placeholder:text-grey-60 disabled:text-grey-30 disabled:placeholder:text-grey-30",
            isActive && "caret-purple-70",
            isReadOnly && "cursor-default",
            showError && "pr-8",
            className
          )}
        />
        {showError && (
          <IconAlertCircleFilled
            size="md"
            className="absolute right-sp-8 text-red-60"
            aria-hidden="true"
          />
        )}
      </div>

      {showHelper && (
        <p className="w-full text-[13px] font-normal leading-normal tracking-[0.04em] text-grey-70">
          {helperText}
        </p>
      )}
      {showError && (
        <p className="w-full text-[13px] font-normal leading-normal tracking-[0.04em] text-red-80">
          {errorMessage}
        </p>
      )}
      {!showHelper && !showError && isFilled && <span className="hidden" aria-hidden="true" />}
    </div>
  );
}

export { Input };
