import TableLoader from "@/components/layouts/loader/TableLoder";
import TeamManagement from "@/components/pages/teamManagement";
import type { Metadata } from "next";
import React from "react";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Team Management",
  description:
    "Manage your team members, roles, and permissions effectively.",
  icons: {
    icon: "/dashboards.ico",
  },
};

const TeamManagementPage = () => {
  return (
    <>
      <Suspense fallback={<TableLoader />}>
        <TeamManagement />
      </Suspense>
    </>
  );
};

export default TeamManagementPage;
