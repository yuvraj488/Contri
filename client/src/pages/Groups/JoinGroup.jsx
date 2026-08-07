import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageWrapper from "@/components/layout/PageWrapper";
import LoadingButton from "@/components/ui/LoadingButton";
import { joinGroup } from "@/services/groupService";
import {
  showSuccess,
  showError,
} from "@/utils/toast";

export default function JoinGroup() {
  const navigate = useNavigate();

  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!inviteCode.trim()) {
      newErrors.inviteCode = "Invite code is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await joinGroup(
        inviteCode.trim().toUpperCase()
      );

      showSuccess(
        "Joined Group",
        `Welcome to ${response.group.name}.`
      );

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      showError(
        "Couldn't Join Group",
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
          Join Group
        </h1>

        <p className="mt-3 text-sm leading-6 text-neutral-500">
          Enter the invite code shared with you.
        </p>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-3xl border border-neutral-200 bg-white p-8"
        >
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            Invite Code
          </label>

          <input
            autoFocus
            value={inviteCode}
            onChange={(e) => {
              setInviteCode(
                e.target.value.toUpperCase()
              );

              if (errors.inviteCode) {
                setErrors({});
              }
            }}
            placeholder="ABC123"
            className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-center text-lg font-semibold uppercase tracking-widest outline-none transition focus:border-emerald-600"
          />

          {errors.inviteCode && (
            <p className="mt-2 text-sm text-red-500">
              {errors.inviteCode}
            </p>
          )}

          <LoadingButton
            type="submit"
            loading={loading}
            text="Join Group"
            loadingText="Joining Group..."
            className="mt-8"
          />
        </form>
      </div>
    </PageWrapper>
  );
}