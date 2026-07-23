function Card({
  title,
  children,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-[32px]
        border
        border-gray-200
        bg-white
        shadow-[0_20px_60px_rgba(15,23,42,0.08)]
        p-10
        ${className}
      `}
    >
      {title && (
        <h2 className="mb-8 text-3xl font-bold text-[var(--text)]">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}

export default Card;