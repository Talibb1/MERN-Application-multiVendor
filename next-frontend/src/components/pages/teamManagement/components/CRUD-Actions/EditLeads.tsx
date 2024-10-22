"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/custom/button";
import { notify } from "@/components/ui/Toast";
import { useUpdateLead } from "@/lib/hooks/api/useLead";
import { UpdateTableSchema } from "./validationSchema";
import { useLoading } from "@/components/ui/ui/loading";

const statusOptions = [
  "Potential",
  "Bad Fit",
  "Qualified",
  "Customer",
  "Interested",
  "Canceled",
  "Not Interested",
] as const;

type StatusType = (typeof statusOptions)[number];

type EditFormValues = z.infer<typeof UpdateTableSchema>;

type EditLeadPopupProps = {
  leadId: number;
  companyName: string;
  status: StatusType;
  industry?: string;
  source?: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
};

export function EditLeadPopup({
  leadId,
  companyName,
  status,
  industry,
  source,
  phone,
  email,
  website,
  description,
  isOpen,
  onClose,
}: EditLeadPopupProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditFormValues>({
    resolver: zodResolver(UpdateTableSchema),
    defaultValues: {
      companyName,
      status,
      industry,
      source,
      phone,
      email,
      website,
      description,
    },
  });

  const { loading, startLoading, stopLoading } = useLoading(false);
  const updateLead = useUpdateLead();

  const onSubmit = async (data: EditFormValues) => {
    startLoading();
    try {
      await updateLead.mutateAsync({
        id: leadId,
        companyName: data.companyName,
        status: data.status,
        industry: data.industry,
        source: data.source,
        phone: data.phone,
        email: data.email,
        website: data.website,
        description: data.description,
      });
      notify("success", "Lead updated successfully!");
      onClose();
    } catch (error: any) {
      notify("error", error?.data?.message || "Failed to update. Please try again.");
    } finally {
      stopLoading();
    }
  };
  useEffect(() => {
    if (isOpen) {
      reset({
        companyName,
        status,
        industry,
        source,
        phone,
        email,
        website,
        description,
      });
    }
  }, [isOpen, reset, companyName, status, industry, source, phone, email, website, description]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-semibold dark:text-gray-100">Edit Lead</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <InputField
              label="Company Name"
              register={register("companyName")}
              error={errors.companyName?.message}
            />
            <InputField
              label="Phone Number"
              register={register("phone")}
              error={errors.phone?.message}
            />
            <SelectField
              label="Status"
              register={register("status")}
              options={statusOptions}
              error={errors.status?.message}
            />
            <InputField
              label="Industry"
              register={register("industry")}
              error={errors.industry?.message}
            />
            <InputField
              label="Source"
              register={register("source")}
              error={errors.source?.message}
            />
            <InputField
              label="Email"
              register={register("email")}
              error={errors.email?.message}
            />
            <InputField
              label="Website"
              register={register("website")}
              error={errors.website?.message}
            />
            <TextAreaField
              label="Description"
              register={register("description")}
              error={errors.description?.message}
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="destructive" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Save Changes"}
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-red-500 border-red-500 hover:bg-red-100 dark:hover:bg-red-500 dark:text-red-400 dark:border-red-400"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  register: ReturnType<typeof register>;
  error?: string;
};

function InputField({ label, register, error }: FieldProps) {
  return (
    <div>
      <label className="block mb-2 dark:text-gray-200">{label}</label>
      <input
        type="text"
        {...register}
        className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white"
      />
      {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}

type SelectFieldProps = FieldProps & {
  options: readonly string[];
};

function SelectField({ label, register, error, options }: SelectFieldProps) {
  return (
    <div>
      <label className="block mb-2 dark:text-gray-200">{label}</label>
      <select
        {...register}
        className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}

function TextAreaField({ label, register, error }: FieldProps) {
  return (
    <div>
      <label className="block mb-2 dark:text-gray-200">{label}</label>
      <textarea
        {...register}
        className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white"
      />
      {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}
