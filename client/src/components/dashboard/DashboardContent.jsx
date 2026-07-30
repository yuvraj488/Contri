import GroupList from "./GroupList";

export default function DashboardContent({ groups }) {
  return (
    <>
      <h1 className="font-manrope text-3xl font-semibold text-stone-900">
        Your Groups
      </h1>

      <p className="mt-2 text-sm text-neutral-500">
        Manage your shared expenses.
      </p>

      <GroupList groups={groups} />
    </>
  );
}