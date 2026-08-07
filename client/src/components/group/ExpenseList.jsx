import ExpenseCard from "./ExpenseCard";

export default function ExpenseList({ expenses }) {
  return (
    <section className="mb-10">

      <h2 className="mb-5 text-xl font-semibold text-stone-900">
        Expenses
      </h2>

      {expenses.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-10 text-center">

          <p className="text-neutral-500">
            No expenses yet.
          </p>

          <p className="mt-2 text-sm text-neutral-400">
            Tap "Add Expense" to get started.
          </p>

        </div>
      ) : (
        <div className="space-y-4">

          {expenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
            />
          ))}

        </div>
      )}

    </section>
  );
}