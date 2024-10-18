import DashboardLoader from "@/components/layouts/loader/DashboardLoader";
import Dashboard from "@/components/pages/dashboard";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "User Dashboard",
  description: "Access and manage your dashboard to view insights and control your settings.",
  icons: {
    icon: "/dashboard.ico",
  },
};

const DashboardPage = () => {
  return (
    <>
      <Suspense fallback={<DashboardLoader />}>
        <Dashboard />
      </Suspense>
    </>
  );
};

export default DashboardPage;
