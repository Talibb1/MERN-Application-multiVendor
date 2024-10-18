"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/custom/button";
import { notify } from "@/components/ui/Toast";
import { useUpdateTeamMember } from "@/lib/hooks/api";
import { useLoading } from "@/components/ui/ui/loading";

type EditRoleFormValues = {
  newRole: string;
};

type EditRolePopupProps = {
  email: string;
  currentRole: string; // Add the current role prop
  organizationId: number;
  isOpen: boolean;
  onClose: () => void;
};

export function EditRolePopup({
  email,
  currentRole,
  organizationId,
  isOpen,
  onClose,
}: EditRolePopupProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditRoleFormValues>({
    defaultValues: {
      newRole: currentRole, // Set default role value to currentRole
    },
  });

  const { loading, startLoading, stopLoading } = useLoading(false);
  const updateRole = useUpdateTeamMember();

  const onSubmit = async (data: EditRoleFormValues) => {
    startLoading();
    try {
      await updateRole.mutateAsync({
        email, // Directly use email from props
        newRole: data.newRole,
        organizationId,
      });
      notify("success", "Role updated successfully!");
      onClose();
    } catch (error: any) {
      notify(
        "error",
        error?.message || "Failed to update the role. Please try again."
      );
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Reset form with the current role as default value
      reset({
        newRole: currentRole, // Set the current role when the modal is open
      });
    }
  }, [isOpen, reset, currentRole]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-[400px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-semibold dark:text-gray-100">Edit Role</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <label className="block mb-2 dark:text-gray-200">New Role</label>
            <select
              {...register("newRole", { required: "Role is required" })}
              className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white"
              defaultValue={currentRole} // Ensure default value is set to current role
            >
              <option value="">Select Role</option>
              <option value="ADMIN">Admin</option>
              <option value="RESTRICTEDUSER">Restricted User</option>
              <option value="SUPERADMIN">Super User</option>
              <option value="USER">User</option>
            </select>
            {errors.newRole && (
              <p className="text-red-500 dark:text-red-400">
                {errors.newRole.message}
              </p>
            )}
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
