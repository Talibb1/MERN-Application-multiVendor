import LeadProfileLoader from "@/components/layouts/loader/LeadProfileLoader";
import LeadProfile from "@/components/pages/leadsDetail";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Lead Details",
  description: "View and manage detailed information about your leads.",
  icons: {
    icon: "/dashboards.ico",
  },
};

const LeadDetailsPage = () => {
  return (
    <>
      <Suspense fallback={<LeadProfileLoader />}>
        <LeadProfile />
      </Suspense>
    </>
  );
};

export default LeadDetailsPage;
