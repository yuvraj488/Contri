import { CheckCircle2, Copy, ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import PageWrapper from "@/components/layout/PageWrapper";

export default function GroupCreated() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const group = state?.group;

  if (!group) {
    navigate("/dashboard", { replace: true });
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(group.inviteCode);
  };

  return (
    <PageWrapper>
      <div className="mx-auto flex min-h-[85vh] max-w-lg items-center justify-center">

        <div className="w-full rounded-3xl border border-neutral-200 bg-white p-8 text-center">

          <CheckCircle2
            size={64}
            className="mx-auto text-emerald-600"
          />

          <h1 className="mt-6 font-manrope text-3xl font-semibold text-stone-900">
            Group Created
          </h1>

          <p className="mt-2 text-neutral-500">
            {group.name} is ready.
          </p>

          {/* Group Code */}

          <div className="mt-10">

            <p className="mb-3 text-sm font-medium text-neutral-600">
              Group Code
            </p>

            <button
              onClick={handleCopy}
              className="flex h-14 w-full items-center justify-between rounded-2xl border border-neutral-200 px-5 transition hover:border-emerald-500"
            >
              <span className="font-mono text-xl font-semibold tracking-widest">
                {group.inviteCode}
              </span>

              <Copy
                size={20}
                className="text-neutral-500"
              />
            </button>

          </div>

          <p className="mt-6 text-sm leading-6 text-neutral-500">
            Share this code with your friends so they can join your group.
          </p>

          <button
            onClick={() =>
              navigate("/dashboard", {
  replace: true,
})
            }
            className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 font-semibold text-white transition hover:bg-emerald-700"
          >
            Go to Group
            <ArrowRight size={18} />
          </button>

        </div>

      </div>
    </PageWrapper>
  );
}