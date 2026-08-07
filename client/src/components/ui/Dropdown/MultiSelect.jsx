import { Check, ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";

import Dropdown from "./Dropdown";
import DropdownOption from "./DropdownOption";

export default function MultiSelect({
  items,
  value,
  onChange,
  placeholder = "Select Participants",
}) {
  const [search, setSearch] = useState("");

  const getInitials = (name) => {
    const cleanName = name
      .replace(/\(.*?\)/g, "")
      .trim();

    return cleanName
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [items, search]);

  const allSelected =
    value.length === items.length;

  const toggleMember = (memberId) => {
    if (value.includes(memberId)) {
      onChange(
        value.filter((id) => id !== memberId)
      );
    } else {
      onChange([...value, memberId]);
    }
  };

  const toggleAll = () => {
    if (allSelected) {
      onChange([]);
    } else {
      onChange(items.map((item) => item.id));
    }
  };

  const summary = () => {
    if (allSelected) {
      return "All Members";
    }

    if (value.length === 0) {
      return placeholder;
    }

    if (value.length === 1) {
      return items.find(
        (item) => item.id === value[0]
      )?.name;
    }

    const first = items.find(
      (item) => item.id === value[0]
    );

    return `${first?.name} +${value.length - 1}`;
  };

  return (
    <Dropdown
      trigger={
        <button
          type="button"
          className="flex h-12 w-full items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 transition hover:border-neutral-300"
        >
          <span className="truncate text-sm font-medium text-stone-900">
            {summary()}
          </span>

          <ChevronDown
            size={18}
            className="text-neutral-500"
          />
        </button>
      }
    >
      {() => (
        <>
          <div className="border-b border-neutral-200 p-3">

            <div className="relative">

              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search members..."
                className="h-10 w-full rounded-lg border border-neutral-200 pl-9 pr-3 text-sm outline-none focus:border-emerald-600"
              />

            </div>

          </div>

          <DropdownOption
  label="Select All"
  selected={allSelected}
  rightSlot={
    allSelected ? (
      <Check
        size={18}
        className="text-emerald-600"
      />
    ) : null
  }
  onClick={toggleAll}
/>

          <div className="border-t border-neutral-100" />

          {filteredItems.map((member) => (
            <DropdownOption
              key={member.id}
              label={member.name}
              avatar={getInitials(member.name)}
              rightSlot={
                value.includes(member.id) ? (
                  <Check
                    size={18}
                    className="text-emerald-600"
                  />
                ) : null
              }
              onClick={() =>
                toggleMember(member.id)
              }
            />
          ))}

          {filteredItems.length === 0 && (
            <p className="p-4 text-center text-sm text-neutral-500">
              No members found.
            </p>
          )}
        </>
      )}
    </Dropdown>
  );
}