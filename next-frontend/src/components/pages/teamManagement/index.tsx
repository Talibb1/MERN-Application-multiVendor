"use client";

import { Suspense, useEffect } from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { useGetUser,useGetTeamMembers } from "@/lib/hooks/api"; // Assuming this hook fetches current user
import TableLoder from "@/components/layouts/loader/TableLoder";

export default function TeamManagement() {
  // Fetch the current user to get their organization ID
  const { data: userData, error: userError, isLoading: userLoading } = useGetUser();
  
  const organizationId = userData?.user?.organizationId;
  const { data, error, isLoading, isFetching } = useGetTeamMembers(organizationId || 0); 

  useEffect(() => {}, [data, error, isFetching]);

  // Handle errors for both user and team members
  if (userError || error) {
    const errorMessage =
      userError?.message || error?.message || "Unknown error occurred.";
    return <p>Error: {errorMessage}</p>;
  }

  // Handle loading states for user or team members
  if (userLoading || isLoading || isFetching) {
    return <TableLoder />;
  }

  const teamMembers = data?.data || [];

  console.log("Team members:", teamMembers);
  return (
    <Suspense>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 px-4 py-6 md:px-8">
          <div className="mb-2 flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Team Management</h2>
              <p className="text-muted-foreground">
                Manage your team members, assign roles, and track their progress.
              </p>
            </div>
          </div>

          {/* ===== Data Table ===== */}
          <div className="flex-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            <DataTable data={teamMembers} columns={columns} />
          </div>
        </main>
      </div>
    </Suspense>
  );
}
