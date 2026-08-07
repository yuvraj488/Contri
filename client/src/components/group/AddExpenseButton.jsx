import { Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddExpenseButton() {
  const navigate = useNavigate();
  const { groupId } = useParams();

  return (
    <button
      onClick={() =>
        navigate(`/groups/${groupId}/add-expense`)
      }
      className="mb-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 font-semibold text-white transition hover:bg-emerald-700"
    >
      <Plus size={20} />

      Add Expense
    </button>
  );
}