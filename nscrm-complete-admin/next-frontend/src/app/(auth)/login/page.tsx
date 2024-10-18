"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ValidationLogin } from "@/components/ui/validationSchema";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EyeButton from "@/components/ui/EyeButton";
import { ToastProvider, notify } from "@/components/ui/Toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLoginUserMutation } from "@/lib/services/api"; 

type FormValues = z.infer<typeof ValidationLogin>;

const LoginForm = () => {
  const [loading, setLoading] = React.useState(false);
  const [login, { isLoading, error }] = useLoginUserMutation(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(ValidationLogin),
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const result = await login(values).unwrap();
      console.log("Login result:", result);
      notify("success", "Login successful!");
      reset();
      window.location.href = "/";
    } catch (err) {
      notify("error", error?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    window.open(`http://localhost:5000/auth/google`, "_self");
  };

  return (
    <>
      <ToastProvider />
      <div className="flex min-h-screen items-center justify-center">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <EyeButton
                  inputId="password"
                  register={register}
                  errors={errors}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full h-12"
                disabled={loading || isLoading}
              >
                {loading || isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
              <Button  onClick={handleGoogleLogin} variant="outline" className="w-full h-12 mt-4">
                <FaGoogle className="mr-2" />
                Login with Google
              </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LoginForm;
