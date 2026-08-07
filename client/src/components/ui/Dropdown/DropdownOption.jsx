import clsx from "clsx";

export default function DropdownOption({
  label,
  description,
  avatar,
  leftSlot,
  rightSlot,
  selected = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors",
        selected
          ? "bg-emerald-50 hover:bg-emerald-100"
          : "hover:bg-neutral-50"
      )}
    >
      {leftSlot ? (
        leftSlot
      ) : avatar ? (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
          {avatar}
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-stone-900">
          {label}
        </p>

        {description && (
          <p className="truncate text-xs text-neutral-500">
            {description}
          </p>
        )}
      </div>

      {rightSlot}
    </button>
  );
}