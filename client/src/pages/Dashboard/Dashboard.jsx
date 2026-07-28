import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">
        Welcome {user?.fullName}
      </h1>

      <button
        onClick={logout}
        className="rounded-xl bg-red-500 px-5 py-3 font-medium text-white"
      >
        Logout
      </button>
    </div>
  );
}