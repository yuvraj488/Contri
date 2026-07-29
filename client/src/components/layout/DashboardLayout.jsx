import Logo from "@/assets/logo.svg";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navbar */}

      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <img
            src={Logo}
            alt="Contri"
            className="h-10 w-auto"
          />

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
            Y
          </div>
        </div>
      </header>

      {/* Page */}

      <main className="mx-auto w-full max-w-7xl px-5 py-6">
        {children}
      </main>
    </div>
  );
}