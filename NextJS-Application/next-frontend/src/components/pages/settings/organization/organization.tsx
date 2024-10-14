"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/ui/input";
import { Button } from "@/components/custom/button";
import { useEffect } from "react";
import { ToastProvider, notify } from "@/components/ui/Toast";
import { OrganizationSchema } from "./OrganizationSchema"; 
import { useCreateOrganization } from "@/lib/hooks/api";
import React from "react";

export default function CreateOrganization() {
  const { mutate: createOrganization, isSuccess, isError } = useCreateOrganization();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      notify("success", "Organization created successfully!");
      reset();
    }

    if (isError) {
      notify("error", "Failed to create organization. Please try again.");
    }
  }, [isSuccess, isError, reset]);

  const onSubmit = (data: { name: string }) => {
    createOrganization(data);
  };

  return (
    <>
      <ToastProvider />
      <div className="container mx-auto p-3 max-w-md">
        <div className="bg-white rounded-lg p-6 shadow-lg space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Organization Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm text-gray-600 mb-3">
                Organization Name
              </label>
              <Input id="name" type="text" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <Button type="submit" className="w-full">
                Create Organization
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
