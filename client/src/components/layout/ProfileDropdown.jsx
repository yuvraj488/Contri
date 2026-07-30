import { LogOut, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";

export default function ProfileDropdown() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const initials =
  user?.fullName
    ?.trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name[0])
    .join("")
    .toUpperCase() || "?";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      {/* Avatar */}

      <button
  onClick={() => setOpen(!open)}
  className="rounded-full"
>
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700 transition hover:bg-emerald-200">
    {initials}
  </div>
</button>

      {/* Dropdown */}

      {open && (
        <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg">

          {/* User */}

          <div className="border-b border-neutral-200 p-4">

            <p className="font-semibold text-stone-900">
              {user?.fullName}
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              {user?.email}
            </p>

          </div>

          {/* Profile */}

          <button
            onClick={() => {
              setOpen(false);
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-neutral-50"
          >
            <User size={18} />
            Profile
          </button>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      )}
    </div>
  );
}