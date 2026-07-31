import { ChevronRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GroupCard({ group }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/groups/${group.id}`)}
      className="flex w-full items-center justify-between rounded-3xl border border-neutral-200 bg-white p-5 text-left transition hover:border-emerald-500 hover:bg-emerald-50"
    >
      <div>
        <h2 className="font-semibold text-stone-900">
          {group.name}
        </h2>

        <div className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
          <Users size={16} />
          {group.memberCount} Members
        </div>
      </div>

      <ChevronRight
        size={20}
        className="text-neutral-400"
      />
    </button>
  );
}