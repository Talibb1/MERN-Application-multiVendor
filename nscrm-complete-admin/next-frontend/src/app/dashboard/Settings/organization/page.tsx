import OrganizationLoader from "@/components/layouts/loader/organizationLoader";
import CreateOrganization from "@/components/pages/settings/organization/organization";
import type { Metadata } from "next";
import React from "react";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Profile Settings",
  description: "Manage and update your profile information and preferences.",
  icons: {
    icon: "/dashboards.ico",
  },
};


const ProfileSettingsPage = () => {
  return (
    <>
      <Suspense fallback={<OrganizationLoader />}>
        <CreateOrganization />
      </Suspense>
    </>
  );
};

export default ProfileSettingsPage;
