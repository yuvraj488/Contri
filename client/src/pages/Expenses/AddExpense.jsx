import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ExpenseForm from "@/components/expense/ExpenseForm";
import { getGroupDashboard } from "@/services/groupService";

export default function AddExpense() {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await getGroupDashboard(groupId);

        setGroupData(response);
      } catch (error) {
        console.error(error);
        navigate(`/groups/${groupId}`);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupId, navigate]);

  if (loading || !groupData) {
    return (
      <DashboardLayout>
        Loading...
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ExpenseForm
        group={groupData.group}
        members={groupData.members}
      />
    </DashboardLayout>
  );
}