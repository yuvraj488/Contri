import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createGroup } from "@/services/groupService";
import PageWrapper from "@/components/layout/PageWrapper";
import LoadingButton from "@/components/ui/LoadingButton";
import {
  showSuccess,
  showError,
} from "@/utils/toast";

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

      showSuccess(
        "Group Created",
        `${response.group.name} is ready.`
      );

      navigate("/groups/created", {
        replace: true,
        state: {
          group: response.group,
        },
      });
    } catch (error) {
      showError(
        "Couldn't Create Group",
        error.response?.data?.message ||
          "Please try again."
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
          className="mb-8 flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-stone-900"
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
              autoFocus
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
              onChange={(e) =>
                setDescription(e.target.value)
              }
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

          <LoadingButton
            type="submit"
            loading={loading}
            text="Create Group"
            loadingText="Creating Group..."
            className="mt-8"
          />
        </form>
      </div>
    </PageWrapper>
  );
}