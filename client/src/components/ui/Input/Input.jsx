import { forwardRef } from "react";
import { cn } from "../../../utils/cn";

const Input = forwardRef(
  (
    {
      leftIcon,
      rightIcon,
      className = "",
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          "flex h-12 items-center rounded-xl border border-[var(--border)] bg-white px-4 transition-all duration-200",
          "focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20",
          disabled && "cursor-not-allowed opacity-60"
        )}
      >
        {leftIcon && (
          <span className="mr-3 text-[var(--text-secondary)]">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            "h-full w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-secondary)]",
            className
          )}
          {...props}
        />

        {rightIcon && (
          <span className="ml-3 text-[var(--text-secondary)]">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;