import Logo from "@/assets/logo.svg";
import { useAuth } from "@/context/AuthContext";
import ProfileDropdown from "@/components/layout/ProfileDropdown";
export default function DashboardLayout({ children }) {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navbar */}

      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <img
            src={Logo}
            alt="Contri"
            className="h-20 w-auto"
          />

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