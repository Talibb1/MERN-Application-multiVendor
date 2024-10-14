import ProfileLoader from "@/components/layouts/loader/ProfileLoader";
import CreateOrganization from "@/components/pages/settings/organization/organization";
import Profile from "@/components/pages/settings/profile/prfile";
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
      <Suspense fallback={<ProfileLoader />}>
        <CreateOrganization />
      </Suspense>
    </>
  );
};

export default ProfileSettingsPage;
