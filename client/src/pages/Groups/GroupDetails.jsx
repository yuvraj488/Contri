import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { getGroupDashboard } from "@/services/groupService";

import GroupHeader from "@/components/group/GroupHeader";
import AddExpenseButton from "@/components/group/AddExpenseButton";

export default function GroupDetails() {
  const { groupId } = useParams();

  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await getGroupDashboard(groupId);

        setGroupData(response);
      } catch (error) {
        console.error(
          error.response?.data?.message || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center py-20">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  if (!groupData || !groupData.group) {
    return (
      <DashboardLayout>
        <div className="flex justify-center py-20 text-red-500">
          Failed to load group.
        </div>
      </DashboardLayout>
    );
  }

  return (
  <DashboardLayout>
    <GroupHeader group={groupData.group} />

    <AddExpenseButton />
  </DashboardLayout>
);
}