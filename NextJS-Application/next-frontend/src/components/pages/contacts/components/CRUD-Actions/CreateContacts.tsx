"use client";

import { useState } from "react";
import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadesSchema } from "./ValidationSchema";
import { ToastProvider, notify } from "@/components/ui/Toast";
import { useCreateContact } from "@/lib/hooks/api";
import { useLoading } from "@/components/ui/ui/loading";
import { PlusIcon } from "@radix-ui/react-icons";

type FormValues = z.infer<typeof LeadesSchema>;

export function Createcontacts({ leadId }: { leadId: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createLead = useCreateContact();
  const { loading, startLoading, stopLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(LeadesSchema),
  });

  const onSubmit = async (data: FormValues) => {
    startLoading();
    try {
      await createLead.mutateAsync({ ...data, leadId }); 
      notify("success", "Contact created successfully!");
      reset();
      setIsModalOpen(false);
    } catch (err: any) {
      notify(
        "error",
        err?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      stopLoading();
    }
  };

  return (
    <>
      <ToastProvider />
      <Button
        variant="outline"
        size="sm"
        className="h-8"
        onClick={() => {
          reset();
          setIsModalOpen(true);
        }}
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        Create Contact
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-semibold dark:text-gray-100">
              Create Contact
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
            >
              <div>
                <Input
                  placeholder="Contact Name"
                  {...register("contactName")}
                  className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white"
                />
                {errors.contactName && isSubmitted && (
                  <p className="text-red-500 text-sm dark:text-red-400">
                    {errors.contactName.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Title"
                  {...register("title")}
                  className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white"
                />
                {errors.title && isSubmitted && (
                  <p className="text-red-500 text-sm dark:text-red-400">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Email"
                  {...register("email")}
                  className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white"
                />
                {errors.email && isSubmitted && (
                  <p className="text-red-500 text-sm dark:text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Phone"
                  {...register("phone")}
                  className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white"
                />
                {errors.phone && isSubmitted && (
                  <p className="text-red-500 text-sm dark:text-red-400">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Position"
                  {...register("position")}
                  className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white"
                />
                {errors.position && isSubmitted && (
                  <p className="text-red-500 text-sm dark:text-red-400">
                    {errors.position.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Contact Details"
                  {...register("contactDetails")}
                  className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white"
                />
                {errors.contactDetails && isSubmitted && (
                  <p className="text-red-500 text-sm dark:text-red-400">
                    {errors.contactDetails.message}
                  </p>
                )}
              </div>
              <div className="md:col-span-2 flex justify-end space-x-2">
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? "Creating..." : "Create"}
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-500 border-red-500 hover:bg-red-100 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-600"
                  onClick={() => {
                    reset();
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
