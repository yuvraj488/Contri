import { ArrowRight, Link2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import GroupList from "./GroupList";

export default function DashboardContent({ groups }) {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="font-manrope text-3xl font-semibold text-stone-900">
        Your Groups
      </h1>

      <p className="mt-2 text-sm text-neutral-500">
        Manage your shared expenses.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">

        {/* Create Group */}

        <button
          onClick={() => navigate("/groups/create")}
          className="group rounded-3xl border border-neutral-200 bg-white p-6 text-left transition-colors hover:border-emerald-500 hover:bg-emerald-50"
        >
          <Plus size={24} className="mb-4 text-emerald-600" />

          <h2 className="text-lg font-semibold text-stone-900">
            Create Group
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Start a new shared expense.
          </p>

          <div className="mt-5 flex items-center text-sm font-semibold text-emerald-600">
            Get Started
            <ArrowRight
              size={16}
              className="ml-2 transition-transform group-hover:translate-x-1"
            />
          </div>
        </button>

        {/* Join Group */}

        <button
          onClick={() => navigate("/groups/join")}
          className="group rounded-3xl border border-neutral-200 bg-white p-6 text-left transition-colors hover:border-emerald-500 hover:bg-emerald-50"
        >
          <Link2 size={24} className="mb-4 text-emerald-600" />

          <h2 className="text-lg font-semibold text-stone-900">
            Join Group
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Join an existing group using an invite code.
          </p>

          <div className="mt-5 flex items-center text-sm font-semibold text-emerald-600">
            Continue
            <ArrowRight
              size={16}
              className="ml-2 transition-transform group-hover:translate-x-1"
            />
          </div>
        </button>

      </div>

      <GroupList groups={groups} />
    </>
  );
}