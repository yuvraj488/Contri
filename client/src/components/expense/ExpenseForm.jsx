import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

import ParticipantSelector from "./ParticipantSelector";
import LoadingButton from "@/components/ui/LoadingButton";
import { createExpense } from "@/services/expenseService";
import {
    showSuccess,
    showError,
} from "@/utils/toast";
import SingleSelect from "@/components/ui/Dropdown/SingleSelect";
import MultiSelect from "@/components/ui/Dropdown/MultiSelect";


export default function ExpenseForm({
    group,
    members,
}) {
    const navigate = useNavigate();
    const { groupId } = useParams();
    const { user } = useAuth();

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");

    const [paidBy, setPaidBy] = useState(user._id);

    const [participants, setParticipants] = useState(
        members.map((member) => member.id)
    );

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = "Expense name is required.";
        }

        if (!amount || Number(amount) <= 0) {
            newErrors.amount = "Enter a valid amount.";
        }

        if (participants.length === 0) {
            newErrors.participants =
                "Select at least one participant.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            console.log(members);
            await createExpense({
                groupId,
                title: title.trim(),
                amount: Number(amount),
                paidBy,
                participants,
                notes: "",
            });

            showSuccess(
                "Expense Added",
                `${title.trim()} has been added successfully.`
            );

            navigate(`/groups/${groupId}`, {
                replace: true,
            });
        } catch (error) {
            showError(
                "Couldn't Add Expense",
                error.response?.data?.message ||
                "Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
  <>
    {/* Back */}

    <button
      onClick={() => navigate(`/groups/${groupId}`)}
      className="mb-8 flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-stone-900"
    >
      <ArrowLeft size={18} />
      Back
    </button>

    {/* Heading */}

    <h1 className="font-manrope text-3xl font-semibold text-stone-900">
      Add Expense
    </h1>

    <p className="mt-2 text-sm text-neutral-500">
      {group.name}
    </p>

    {/* Form */}

    <form
      onSubmit={handleSubmit}
      className="mt-10 rounded-3xl border border-neutral-200 bg-white p-8"
    >
      {/* Expense Name */}

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Expense Name
        </label>

        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Dinner"
          className="h-12 w-full rounded-xl border border-neutral-200 px-4 outline-none transition focus:border-emerald-600"
        />

        {errors.title && (
          <p className="mt-2 text-sm text-red-500">
            {errors.title}
          </p>
        )}
      </div>

      {/* Amount */}

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Amount
        </label>

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
            ₹
          </span>

          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="h-12 w-full rounded-xl border border-neutral-200 pl-10 pr-4 outline-none transition focus:border-emerald-600"
          />
        </div>

        {errors.amount && (
          <p className="mt-2 text-sm text-red-500">
            {errors.amount}
          </p>
        )}
      </div>

      {/* Paid By */}

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Paid By
        </label>

        <SingleSelect
  items={members}
  value={paidBy}
  onChange={setPaidBy}
  currentUserId={user._id}
/>
      </div>

      {/* Split With */}

      <div className="mb-8">
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Split With
        </label>

        <MultiSelect
          items={members}
          value={participants}
          onChange={setParticipants}
        />

        {errors.participants && (
          <p className="mt-2 text-sm text-red-500">
            {errors.participants}
          </p>
        )}
      </div>

      {/* Buttons */}

      <div className="mt-10 flex gap-4">
        <button
          type="button"
          onClick={() => navigate(`/groups/${groupId}`)}
          className="flex h-12 items-center justify-center rounded-xl border border-neutral-300 bg-white px-6 font-medium text-neutral-700 transition hover:bg-neutral-50"
        >
          Cancel
        </button>

        <LoadingButton
          type="submit"
          loading={loading}
          text="Add Expense"
          loadingText="Adding Expense..."
          className="flex-1"
        />
      </div>
    </form>
  </>
);
}