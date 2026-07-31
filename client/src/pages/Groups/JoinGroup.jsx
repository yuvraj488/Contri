import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageWrapper from "@/components/layout/PageWrapper";
import { joinGroup } from "@/services/groupService";

export default function JoinGroup() {
  const navigate = useNavigate();

  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

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
    setServerError("");

    try {
      await joinGroup(inviteCode.trim().toUpperCase());

      navigate("/dashboard", {
        replace: true,
      });

    } catch (error) {
      setServerError(
        error.response?.data?.message || "Something went wrong."
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
            value={inviteCode}
            onChange={(e) => {
              setInviteCode(e.target.value.toUpperCase());

              if (errors.inviteCode) {
                setErrors({});
              }

              if (serverError) {
                setServerError("");
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

          {serverError && (
            <p className="mt-4 text-sm text-red-500">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Joining..." : "Join Group"}

            {!loading && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </PageWrapper>
  );
}