"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/custom/button";
import { notify } from "@/components/ui/Toast";
import { useUpdateContact } from "@/lib/hooks/api";
import { UpdateContactSchema } from "./ValidationSchema";
import { useLoading } from "@/components/ui/ui/loading";

type EditFormValues = z.infer<typeof UpdateContactSchema>;

type EditLeadPopupProps = {
  contactId: number;
  contactName: string;
  title?: string;
  email?: string;
  phone?: string;
  position?: string;
  contactDetails?: string;
  isOpen: boolean;
  onClose: () => void;
};

export function EditLeadPopup({
  contactId,
  contactName,
  title,
  email,
  phone,
  position,
  contactDetails,
  isOpen,
  onClose,
}: EditLeadPopupProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditFormValues>({
    resolver: zodResolver(UpdateContactSchema),
    defaultValues: {
      contactName,
      title,
      email,
      phone,
      position,
      contactDetails,
    },
  });

  const { loading, startLoading, stopLoading } = useLoading(false);
  const updateLead = useUpdateContact();

  const onSubmit = async (data: EditFormValues) => {
    startLoading();
    try {
      await updateLead.mutateAsync({
        id: contactId,
        contactName: data.contactName,
        title: data.title,
        email: data.email,
        phone: data.phone,
        position: data.position,
        contactDetails: data.contactDetails,
      });
      notify("success", "Contact updated successfully!");
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
        contactName,
        title,
        email,
        phone,
        position,
        contactDetails,
      });
    }
  }, [isOpen, reset, contactName, title, email, phone, position, contactDetails]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-semibold dark:text-gray-100">Edit Contact</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <InputField
              label="Contact Name"
              register={register("contactName")}
              error={errors.contactName?.message}
            />
            <InputField
              label="Title"
              register={register("title")}
              error={errors.title?.message}
            />
            <InputField
              label="Email"
              register={register("email")}
              error={errors.email?.message}
            />
            <InputField
              label="Phone"
              register={register("phone")}
              error={errors.phone?.message}
            />
            <InputField
              label="Position"
              register={register("position")}
              error={errors.position?.message}
            />
            <TextAreaField
              label="Contact Details"
              register={register("contactDetails")}
              error={errors.contactDetails?.message}
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
