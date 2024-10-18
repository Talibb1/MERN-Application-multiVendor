import ForgotPasswordLoader from "@/components/layouts/loader/ForgotPasswordLoader";
import ForgotPassword from "@/components/pages/auth/forgot-password";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your password and regain access to your account.",
};

const forgotpassword = () => {
  return (
    <Suspense fallback={<ForgotPasswordLoader />}>
      <ForgotPassword />
    </Suspense>
  );
};

export default forgotpassword;
