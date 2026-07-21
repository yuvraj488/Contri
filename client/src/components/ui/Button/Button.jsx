function Button({
  children,
  type = "button",
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        w-full
        rounded-xl
        bg-[var(--primary)]
        px-5
        py-3
        font-semibold
        text-white
        transition-all
        duration-200
        hover:opacity-90
        active:scale-[0.98]
        disabled:opacity-50
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;