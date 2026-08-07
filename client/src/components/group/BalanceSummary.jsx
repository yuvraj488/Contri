export default function BalanceSummary({ summary }) {
  return (
    <div className="mb-8 space-y-5">

      {/* To Pay */}

      <section className="rounded-3xl border border-red-100 bg-white p-6">

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-stone-900">
            To Pay
          </h2>

          <span className="text-2xl font-bold text-red-500">
            ₹{summary.toPay.total}
          </span>
        </div>

        {summary.toPay.members.length > 0 ? (
          <div className="mt-5 space-y-3">

            {summary.toPay.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between"
              >
                <span className="text-neutral-700">
                  {member.name}
                </span>

                <span className="font-semibold text-red-500">
                  ₹{member.amount}
                </span>
              </div>
            ))}

          </div>
        ) : (
          <p className="mt-4 text-sm text-neutral-500">
            Nothing to pay 🎉
          </p>
        )}

      </section>

      {/* To Get */}

      <section className="rounded-3xl border border-emerald-100 bg-white p-6">

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-stone-900">
            To Get
          </h2>

          <span className="text-2xl font-bold text-emerald-600">
            ₹{summary.toGet.total}
          </span>
        </div>

        {summary.toGet.members.length > 0 ? (
          <div className="mt-5 space-y-3">

            {summary.toGet.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between"
              >
                <span className="text-neutral-700">
                  {member.name}
                </span>

                <span className="font-semibold text-emerald-600">
                  ₹{member.amount}
                </span>
              </div>
            ))}

          </div>
        ) : (
          <p className="mt-4 text-sm text-neutral-500">
            Nobody owes you anything.
          </p>
        )}

      </section>

    </div>
  );
}