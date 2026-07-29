import { ArrowRight, Link2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function EmptyDashboard() {
    const navigate = useNavigate();
  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center">
      <div className="mx-auto w-full max-w-md text-center">
        {/* Heading */}

        <h1 className="font-manrope text-2xl font-semibold text-stone-900">
          Welcome 👋
        </h1>

        <p className="mt-4 text-sm leading-6 text-neutral-500">
          You're not part of any groups yet.
          <br />
          Create your first group or join an existing one to start splitting
          expenses.
        </p>

        {/* Actions */}

        <div className="mt-10 flex flex-col gap-4">
          {/* Create Group */}

          <button onClick={() => navigate("/groups/create")} className="group rounded-3xl border border-neutral-200 bg-white p-5 text-left transition-colors hover:border-emerald-500 hover:bg-emerald-50">
            <Plus
              size={24}
              className="mb-3 text-emerald-600"
            />

            <h2 className="text-base font-semibold text-stone-900">
              Create Group
            </h2>

            <p className="mt-2 text-sm leading-5 text-neutral-500">
              Start a new trip, flat, event or any shared expense.
            </p>

            <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600">
              Get Started
              <ArrowRight
                size={16}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </div>
          </button>

          {/* Join Group */}

          <button onClick={() => navigate("/groups/join")} className="group rounded-3xl border border-neutral-200 bg-white p-5 text-left transition-colors hover:border-emerald-500 hover:bg-emerald-50">
            <Link2
              size={24}
              className="mb-3 text-emerald-600"
            />

            <h2 className="text-base font-semibold text-stone-900">
              Join Group
            </h2>

            <p className="mt-2 text-sm leading-5 text-neutral-500">
              Join an existing group using an invite code.
            </p>

            <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600">
              Continue
              <ArrowRight
                size={16}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}