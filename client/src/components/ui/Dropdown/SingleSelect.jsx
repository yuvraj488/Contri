import { Check, ChevronDown } from "lucide-react";

import Dropdown from "./Dropdown";
import DropdownOption from "./DropdownOption";

export default function SingleSelect({
  items,
  value,
  onChange,
  currentUserId,
  placeholder = "Select",
}) {
  const selectedItem = items.find(
    (item) => item.id === value
  );

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const renderLabel = (item) => {
    if (!item) return placeholder;

    return item.id === currentUserId
      ? item.name
      : item.name;
  };

  return (
    <Dropdown
      trigger={
        <button
          type="button"
          className="flex h-12 w-full items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 transition hover:border-neutral-300"
        >
          <div className="flex items-center gap-3">
            {selectedItem && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">
                {getInitials(selectedItem.name)}
              </div>
            )}

            <span className="text-sm font-medium text-stone-900">
              {renderLabel(selectedItem)}
            </span>
          </div>

          <ChevronDown
            size={18}
            className="text-neutral-500"
          />
        </button>
      }
    >
      {({ close }) => (
        <>
          {items.map((item) => (
            <DropdownOption
              key={item.id}
              avatar={getInitials(item.name)}
              label={item.name}
              description={
                item.id === currentUserId
                  ? "You"
                  : undefined
              }
              selected={item.id === value}
              rightSlot={
                item.id === value ? (
                  <Check
                    size={18}
                    className="text-emerald-600"
                  />
                ) : null
              }
              onClick={() => {
                onChange(item.id);
                close();
              }}
            />
          ))}
        </>
      )}
    </Dropdown>
  );
}