import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import EmptyDashboard from "@/components/dashboard/EmptyDashboard";
import DashboardContent from "@/components/dashboard/DashboardContent";

import PageLoader from "@/components/common/PageLoader";

import { getMyGroups } from "@/services/groupService";

export default function Dashboard() {

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchGroups = async () => {

      try {

        const response = await getMyGroups();

        setGroups(response.groups);

      } catch (error) {

        console.error(
          error.response?.data?.message || error.message
        );

      } finally {

        setLoading(false);

      }

    };

    fetchGroups();

  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <DashboardLayout>

      {groups.length === 0 ? (
        <EmptyDashboard />
      ) : (
        <DashboardContent groups={groups} />
      )}

    </DashboardLayout>
  );
}