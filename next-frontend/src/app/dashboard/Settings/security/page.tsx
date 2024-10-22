import SecurityLoader from "@/components/layouts/loader/SecurityLoader";
import Security from "@/components/pages/settings/security/security";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Security Settings",
  description: "Manage your security settings, passwords, and account protection.",
  icons: {
    icon: "/dashboards.ico",
  },
};

const SecuritySettingsPage = () => {
  return (
    <>
      <Suspense fallback={<SecurityLoader />}>
        <Security />
      </Suspense>
    </>
  );
};

export default SecuritySettingsPage;
