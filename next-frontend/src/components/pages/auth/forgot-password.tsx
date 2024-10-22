"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ValidationForgotPass } from "@/components/ui/validationSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastProvider, notify } from "@/components/ui/Toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type FormValues = z.infer<typeof ValidationForgotPass>;

const ForgotPassword = () => {
  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(ValidationForgotPass),
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      console.log("Form values:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      notify("success", "Password reset link sent!");
      reset();
    } catch (error) {
      notify("error", "Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastProvider />
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Card className="mx-auto max-w-sm bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">Forgot Password</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Enter your email below to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Your Email"
                  {...register("email")}
                  className={`block w-full rounded-md border px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full h-12 mt-4"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
              <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                Remembered your password?{" "}
                <Link href="/signin" className="underline text-indigo-600 dark:text-indigo-400">
                  Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ForgotPassword;
