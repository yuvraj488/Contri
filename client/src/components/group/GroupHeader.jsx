import { ArrowLeft, Check, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function GroupHeader({ group }) {
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(group.inviteCode);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="mb-8">
      {/* Back */}

      <button
        onClick={() => navigate("/dashboard")}
        className="mb-5 flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-stone-900"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Header */}

      <div className="flex items-center justify-between gap-4">
        <h1 className="min-w-0 truncate font-manrope text-2xl font-semibold text-stone-900">
          {group.name}
        </h1>

        <button
          onClick={copyCode}
          className="flex flex-shrink-0 items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 transition hover:bg-emerald-100"
        >
          <span className="font-mono text-sm font-semibold tracking-wider text-emerald-700">
            {group.inviteCode}
          </span>

          {copied ? (
            <Check
              size={16}
              className="text-emerald-600"
            />
          ) : (
            <Copy
              size={16}
              className="text-emerald-600"
            />
          )}
        </button>
      </div>

      {/* Description */}

      {group.description && (
        <p className="mt-2 text-sm leading-6 text-neutral-500">
          {group.description}
        </p>
      )}
    </div>
  );
}