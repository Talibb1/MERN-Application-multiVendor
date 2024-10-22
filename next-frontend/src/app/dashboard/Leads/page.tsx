import TableLoader from "@/components/layouts/loader/TableLoder";
import Tables from "@/components/pages/leads";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Lead Tables",
  description: "View and manage lead tables easily on this page.",
  icons: {
    icon: "/dashboards.ico",
  },
};

const ManageTablesPage = () => {
  return (
    <>
      <Suspense fallback={<TableLoader />}>
        <Tables />
      </Suspense>
    </>
  );
};

export default ManageTablesPage;
