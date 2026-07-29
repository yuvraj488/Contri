import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createGroup } from "@/services/groupService";
import PageWrapper from "@/components/layout/PageWrapper";

export default function CreateGroup() {
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!groupName.trim()) {
      newErrors.groupName = "Group name is required.";
    } else if (groupName.trim().length > 50) {
      newErrors.groupName =
        "Group name cannot exceed 50 characters.";
    }

    if (description.trim().length > 200) {
      newErrors.description =
        "Description cannot exceed 200 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await createGroup({
        name: groupName.trim(),
        description: description.trim(),
      });

      navigate("/groups/created", {
  state: {
    group: response.group,
  },
});

      // We'll replace this with the success page next
      // navigate("/groups/success");

    } catch (error) {
      console.error(
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="mx-auto w-full max-w-lg py-4">

        {/* Back */}

        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-stone-900"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Heading */}

        <h1 className="font-manrope text-3xl font-semibold text-stone-900">
          Create Group
        </h1>

        <p className="mt-3 text-sm leading-6 text-neutral-500">
          Give your group a name and start splitting expenses.
        </p>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-3xl border border-neutral-200 bg-white p-8"
        >
          {/* Group Name */}

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Group Name
            </label>

            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Goa Trip"
              className="h-12 w-full rounded-xl border border-neutral-200 px-4 outline-none transition focus:border-emerald-600"
            />

            {errors.groupName && (
              <p className="mt-2 text-sm text-red-500">
                {errors.groupName}
              </p>
            )}
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Description{" "}
              <span className="text-neutral-400">
                (Optional)
              </span>
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="College trip in December..."
              className="w-full resize-none rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-emerald-600"
            />

            {errors.description && (
              <p className="mt-2 text-sm text-red-500">
                {errors.description}
              </p>
            )}
          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Group"}

            {!loading && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </PageWrapper>
  );
}