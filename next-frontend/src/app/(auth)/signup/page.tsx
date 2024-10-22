import RegisterFormLoader from "@/components/layouts/loader/RegisterFormLoader";
import RegisterForm from "@/components/pages/auth/sign-up";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account to get started with our services.",
};

const signup = () => {
  return (
    <>
    <Suspense fallback={<RegisterFormLoader />}>
      <RegisterForm />
    </Suspense>
    </>
  );
};

export default signup;
