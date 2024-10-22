"use client";

import { useState } from "react";
import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadesSchema } from "@/components/ui/validationSchema";
import { ToastProvider, notify } from "@/components/ui/Toast";
import { useCreateLead } from "@/lib/hooks/api/useLead";
import { useLoading } from "@/components/ui/ui/loading";
import { PlusIcon } from "@radix-ui/react-icons";
import { useUploadCsv } from "@/lib/hooks/api/useFile";
import React from "react";

type FormValues = z.infer<typeof LeadesSchema>;

export function CreateLeads() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createLead = useCreateLead();
  const uploadCsv = useUploadCsv();
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
      await createLead.mutateAsync(data);
      notify("success", "Lead created successfully!");
      reset();
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Error creating lead:", err);
      notify("error", err?.data?.message || "Something went wrong. Please try again.");
    } finally {
      stopLoading();
    }
  };

  const handleCsvUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      console.log("Uploading file:", file.name, "Type:", file.type);
      if (file.type === "text/csv") {
        startLoading();
        try {
          const formData = new FormData();
          formData.append("file", file);
          const response = await uploadCsv.mutateAsync(formData);
          console.log("CSV upload response:", response);
          notify("success", "CSV file uploaded successfully!");
          setIsModalOpen(false);
        } catch (err: any) {
          console.error("CSV upload error:", err);
          notify("error", err?.data?.message || "Failed to upload CSV file. Please try again...");
        } finally {
          stopLoading();
        }
      } else {
        notify("error", "Please upload a valid CSV file.");
      }
    } else {
      notify("error", "No file selected. Please choose a file to upload.");
    }
  };

  return (
    <>
      <ToastProvider />
      <Button
        variant="outline"
        size="sm"
        className="h-8"
        onClick={() => setIsModalOpen(true)}
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        Create Leads
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-[400px] max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-semibold dark:text-gray-100">
              Form Title
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Company Name"
                    {...register("companyName")}
                    className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white"
                    isInvalid={!!errors.companyName && isSubmitted}
                  />
                  {errors.companyName && isSubmitted && (
                    <p className="text-red-500 text-sm dark:text-red-400">
                      {errors.companyName?.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Contact Name"
                    {...register("contactName")}
                    className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white"
                    isInvalid={!!errors.contactName && isSubmitted}
                  />
                  {errors.contactName && isSubmitted && (
                    <p className="text-red-500 text-sm dark:text-red-400">
                      {errors.contactName?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-start space-x-2">
                <label className="inline-block">
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() =>
                      document.getElementById("csvUpload")?.click()
                    }
                  >
                    Upload CSV
                  </Button>
                  <input
                    id="csvUpload"
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleCsvUpload}
                  />
                </label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? "Creating..." : "Create"}
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-500 border-red-500 hover:bg-red-100 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-600"
                  onClick={() => setIsModalOpen(false)}
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
