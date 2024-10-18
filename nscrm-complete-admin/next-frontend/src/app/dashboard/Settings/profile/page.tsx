import ProfileLoader from "@/components/layouts/loader/ProfileLoader";
import Profile from "@/components/pages/settings/profile/prfile";
import type { Metadata } from "next";
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
        <Profile />
      </Suspense>
    </>
  );
};

export default ProfileSettingsPage;
