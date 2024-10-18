"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ValidationSignup } from "@/components/ui/validationSchema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EyeButton from "@/components/ui/EyeButton"; 
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToastProvider, notify } from "@/components/ui/Toast"; 
import { useCreateUser } from "@/lib/hooks/api"; 

type FormValues = z.infer<typeof ValidationSignup>;


const RegisterForm = () => {
  const [loading, setLoading] = React.useState(false);
  
  const { mutateAsync: createUser, isLoading } = useCreateUser();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(ValidationSignup),
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      await createUser(values);
      notify("success", "Account created successfully!");
      reset();
      window.location.href = "/signin";
    } catch (error: any) {
      notify("error", error?.data?.message || "Something went wrong. Please try again.");
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
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Card className="mx-auto max-w-sm bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">Sign Up</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Enter your details below to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Max"
                    {...register("firstName")}
                    className={`block w-full rounded-md border px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.firstName ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Robinson"
                    {...register("lastName")}
                    className={`block w-full rounded-md border px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.lastName ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  className={`block w-full rounded-md border px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'} dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
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

              <Button type="submit" className="w-full h-12" disabled={loading || isLoading}>
                {loading || isLoading ? "Creating Account..." : "Create Account"}
              </Button>

            </form>
              <Button onClick={handleGoogleLogin} variant="outline" className="w-full h-12 mt-4">
                <FcGoogle className="mr-2" />
                Sign up with Google
              </Button>

              <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link href="/signin" className="underline text-indigo-600 dark:text-indigo-400">
                  Login
                </Link>
              </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default RegisterForm;
