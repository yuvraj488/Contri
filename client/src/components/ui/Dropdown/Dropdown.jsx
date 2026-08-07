import { useEffect, useRef, useState } from "react";

export default function Dropdown({
  trigger,
  children,
  className = "",
  open: controlledOpen,
  setOpen: controlledSetOpen,
}) {
  const [internalOpen, setInternalOpen] = useState(false);

  const open =
    controlledOpen ?? internalOpen;

  const setOpen =
    controlledSetOpen ?? setInternalOpen;

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
  }, [setOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () =>
      document.removeEventListener(
        "keydown",
        handleEscape
      );
  }, [setOpen]);

  return (
    <div
      ref={dropdownRef}
      className="relative w-full"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() =>
          setOpen((prev) => !prev)
        }
        onKeyDown={(event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();
            setOpen((prev) => !prev);
          }

          if (event.key === "Escape") {
            setOpen(false);
          }
        }}
      >
        {trigger}
      </div>

      <div
        className={`absolute left-0 top-full z-50 mt-2 w-full origin-top overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl transition-all duration-150 ${
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        } ${className}`}
      >
        <div className="max-h-72 overflow-y-auto">
          {children({
            close: () => setOpen(false),
          })}
        </div>
      </div>
    </div>
  );
}