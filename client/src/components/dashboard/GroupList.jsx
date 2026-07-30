import GroupCard from "./GroupCard";

export default function GroupList({ groups }) {
  return (
    <div className="mt-8 space-y-4">
      {groups.map((group) => (
        <GroupCard
          key={group.id}
          group={group}
        />
      ))}
    </div>
  );
}