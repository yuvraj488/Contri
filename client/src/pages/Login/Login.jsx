import logo from "../../assets/logo.svg";

function Login() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Contri"
            className="w-72"
          />
        </div>

        <p className="text-center text-gray-600 mb-10 text-lg">
          Shared expenses, made effortless.
        </p>

        <div className="bg-white rounded-3xl border border-[var(--border)] shadow-lg p-8">

          <div className="space-y-5">

            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-[var(--border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-[var(--border)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />

            <button
              className="w-full rounded-xl bg-[var(--primary)] py-3 font-semibold text-white transition hover:opacity-90"
            >
              Log In
            </button>

          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?
            <span className="ml-2 cursor-pointer font-semibold text-[var(--primary)]">
              Sign Up
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;