import { Check } from "lucide-react";

export default function ParticipantSelector({
    members,
    participants,
    setParticipants,
}) {
    const allSelected =
        participants.length === members.length;

    const toggleAll = () => {
        if (allSelected) {
            setParticipants([]);
        } else {
            setParticipants(
                members.map((member) => member.id)
            );
        }
    };

    const toggleParticipant = (id) => {
        if (participants.includes(id)) {
            setParticipants(
                participants.filter(
                    (participant) => participant !== id
                )
            );
        } else {
            setParticipants([
                ...participants,
                id,
            ]);
        }
    };

    return (
        <div className="mb-8">
            <label className="mb-3 block text-sm font-medium text-neutral-700">
                Participants
            </label>

            <div className="space-y-3">

                {/* Select All */}

                <button
                    type="button"
                    onClick={toggleAll}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition ${allSelected
                            ? "border-emerald-300 bg-emerald-50"
                            : "border-neutral-200 bg-white"
                        }`}
                >
                    <span className="font-medium">
                        Select All
                    </span>

                    {allSelected && (
                        <Check
                            size={18}
                            className="text-emerald-600"
                        />
                    )}
                </button>

                {/* Members */}

                {members.map((member) => {
                    const selected =
                        participants.includes(member.id);

                    return (
                        <button
                            key={member.id}
                            type="button"
                            onClick={() =>
                                toggleParticipant(member.id)
                            }
                            className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition ${selected
                                    ? "border-emerald-300 bg-emerald-50"
                                    : "border-neutral-200 bg-white"
                                }`}
                        >
                            <span>{member.name}</span>

                            {selected && (
                                <Check
                                    size={18}
                                    className="text-emerald-600"
                                />
                            )}
                        </button>
                    );
                })}
            </div>
            {participants.length === 0 && (
  <p className="mt-3 text-sm text-red-500">
    No participants selected.
  </p>
)}
        </div>
    );
}