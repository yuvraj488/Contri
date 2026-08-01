import Logo from "@/assets/logo.svg";
import { useNavigate } from "react-router-dom";

import ProfileDropdown from "./ProfileDropdown";

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navbar */}

      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">

          {/* Logo */}

          <button
            onClick={() => navigate("/dashboard")}
            className="transition-opacity hover:scale-[1.02]
active:scale-95
transition-all
duration-200"
          >
            <img
              src={Logo}
              alt="Contri"
              className="h-20 w-auto"
            />
          </button>

          {/* Profile */}

          <ProfileDropdown />

        </div>
      </header>

      {/* Page */}

      <main className="mx-auto w-full max-w-7xl px-5 py-6">
        {children}
      </main>
    </div>
  );
}