function Input({
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        rounded-xl
        border
        border-[var(--border)]
        px-4
        py-3
        outline-none
        transition
        focus:border-[var(--primary)]
        focus:ring-2
        focus:ring-[var(--primary)]
      "
    />
  );
}

export default Input;