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
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToastProvider, notify } from "@/components/ui/Toast"; 
import { useCreateUserMutation } from "@/lib/services/api"; 

type FormValues = z.infer<typeof ValidationSignup>;

const RegisterForm = () => {
  const [loading, setLoading] = React.useState(false);
const [createUser, { isLoading, error }] = useCreateUserMutation();

  const {register,handleSubmit,formState: { errors },reset,} = useForm<FormValues>({resolver: zodResolver(ValidationSignup),});

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const result = await createUser(values).unwrap();
      console.log(result);
      console.log(values);

      notify("success", "Account created successfully!");
      reset();
      window.location.href = "/login";
    } catch (err) {

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
      <div className="flex min-h-screen items-center justify-center">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your details below to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Max"
                    {...register("firstName")}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Robinson"
                    {...register("lastName")}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

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
                <Label htmlFor="password">Password</Label>
                <EyeButton
                  inputId="password"
                  register={register}
                  errors={errors}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>


              <Button type="submit" className="w-full h-12" disabled={loading || isLoading}>
                {loading || isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
              <Button onClick={handleGoogleLogin} variant="outline" className="w-full h-12 mt-4">
                <FaGoogle className="mr-2" />
                Sign up with Google
              </Button>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline">
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
