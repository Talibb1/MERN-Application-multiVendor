import LoginFormLoader from "@/components/layouts/loader/LoginFormLoader";
import LoginForm from "@/components/pages/auth/sign-in";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Access your account by signing in with your credentials.",
};

const signin = () => {
  return (
    <Suspense fallback={<LoginFormLoader />}>
      <LoginForm />
    </Suspense>
  );
};

export default signin;
