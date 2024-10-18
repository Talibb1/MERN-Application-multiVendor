"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import EyeButton from "@/components/ui/EyeButton";
import { ToastProvider, notify } from "@/components/ui/Toast";
import { useChangePassword } from "@/lib/hooks/api";
import { ChangepasswordSchema } from "@/components/ui/validationSchema";

export default function Security() {
  const [loading, setLoading] = useState(false);
  const { mutateAsync: changePassword } = useChangePassword(); // Extract mutateAsync for API call

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(ChangepasswordSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Call the mutation function and await the result
      const result = await changePassword(data); 
      notify("success", "Password changed successfully!");
      reset();
    } catch (error: any) {
      notify(
        "error",
        error?.data?.message || "Failed to change password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ToastProvider />
      <div className="container mx-auto p-3 max-w-2xl">
        <div className="bg-white rounded-lg p-6 shadow-lg space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-4">
              {/* Old Password */}
              <div className="flex flex-col">
                <label
                  htmlFor="currentPassword"
                  className="text-sm text-gray-600"
                >
                  Old password
                </label>
                <div className="relative">
                  <EyeButton
                    inputId="currentPassword"
                    register={register}
                    errors={errors}
                    placeholder="••••••••"
                  />
                </div>
                {errors.currentPassword && (
                  <p className="text-red-500 text-xs">
                    {String(errors.currentPassword.message)}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="flex flex-col">
                <label htmlFor="newPassword" className="text-sm text-gray-600">
                  New password
                </label>
                <div className="relative">
                  <EyeButton
                    inputId="newPassword"
                    register={register}
                    errors={errors}
                    placeholder="••••••••"
                  />
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-xs">
                    {String(errors.newPassword.message)}
                  </p>
                )}
              </div>

              {/* Confirm New Password */}
              <div className="flex flex-col">
                <label
                  htmlFor="newPasswordConfirmation"
                  className="text-sm text-gray-600"
                >
                  Confirm new password
                </label>
                <div className="relative">
                  <EyeButton
                    inputId="newPasswordConfirmation"
                    register={register}
                    errors={errors}
                    placeholder="••••••••"
                  />
                </div>
                {errors.newPasswordConfirmation && (
                  <p className="text-red-500 text-xs">
                    {String(errors.newPasswordConfirmation.message)}
                  </p>
                )}
              </div>
              <div className="mt-6">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
