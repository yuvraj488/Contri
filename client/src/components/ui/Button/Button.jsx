const variants = {
  primary:
    "bg-[var(--primary)] text-white hover:opacity-90",

  secondary:
    "bg-gray-100 text-[var(--text)] hover:bg-gray-200",

  outline:
    "border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white",

  danger:
    "bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-3",
  lg: "px-6 py-4 text-lg",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = true,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={`
        rounded-xl
        font-semibold
        transition-all
        duration-200
        active:scale-[0.98]
        disabled:opacity-50
        disabled:cursor-not-allowed

        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : "w-auto"}

        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;