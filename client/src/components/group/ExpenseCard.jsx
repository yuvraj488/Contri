export default function ExpenseCard({ expense }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-5 transition hover:border-neutral-300">

      <div className="flex items-center justify-between">

        <div>

          <h3 className="text-base font-semibold text-stone-900">
            {expense.title}
          </h3>

          <p className="mt-1 text-sm text-neutral-500">
            Paid by {expense.paidBy.name}
          </p>

        </div>

        <span className="text-lg font-semibold text-stone-900">
          ₹{expense.amount}
        </span>

      </div>

    </div>
  );
}