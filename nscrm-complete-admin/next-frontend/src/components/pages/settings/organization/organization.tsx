"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/ui/input";
import { Button } from "@/components/custom/button";
import { ToastProvider, notify } from "@/components/ui/Toast";
import { OrganizationSchema } from "./OrganizationSchema";
import {
  useCreateOrganization,
  useGetOrganizationById,
  useGetUser,
  useUpdateUserOrganization,
} from "@/lib/hooks/api";
import OrgLoader from "@/components/layouts/loader/organizationLoader";
import OrganizationList from "./OrganizationList";
import { FaPlus, FaListAlt } from "react-icons/fa";

export default function CreateOrganization() {
  const [view, setView] = useState("create");
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);

  // Fetch the user data to get id
  const { data: userData, isLoading: isUserLoading, isError: isUserError } = useGetUser();
  const userId = userData?.user.id;
  const currentOrgId = userData?.user.organizationId;

  // Hook for creating an organization
  const { mutate: createOrganization, isSuccess, isError: isCreateError } = useCreateOrganization();
  // Hook for updating user's selected organization
  const { mutate: updateUserOrganization, isSuccess: isUpdateSuccess, isError: isUpdateError } = useUpdateUserOrganization();

  // Fetch organizations for the user
  const { data: fetchedOrganizations, isLoading: isFetchingOrganizations } = useGetOrganizationById(userId || 0);
  const organizations = fetchedOrganizations?.data || [];

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      name: "",
    },
  });

  // Handle form submission for creating an organization
  const onSubmit = (data: { name: string }) => {
    if (userId) {
      createOrganization({ ...data, id: userId });
    }
  };

  // Handle organization creation success or error
  useEffect(() => {
    if (isSuccess) {
      notify("success", "Organization created successfully!");
      reset(); // Reset form values
      setView("list"); // Switch to the organization list view after creation
    }

    if (isCreateError) {
      notify("error", "Failed to create organization. Please try again.");
    }
  }, [isSuccess, isCreateError, reset]);

  // Handle organization change
  const handleOrgChange = (orgId: string) => {
    const parsedOrgId = parseInt(orgId);
    setSelectedOrgId(parsedOrgId);
    updateUserOrganization({ orgId: parsedOrgId }); // Send update request to server
  };

  // Handle organization update success or error
  useEffect(() => {
    if (isUpdateSuccess) {
      notify("success", "Organization updated successfully!");
    }
    if (isUpdateError) {
      notify("error", "Failed to update organization. Please try again.");
    }
  }, [isUpdateSuccess, isUpdateError]);

  // Set selected organization when user data loads
  useEffect(() => {
    if (currentOrgId) {
      setSelectedOrgId(currentOrgId);
    }
  }, [currentOrgId]);

  if (isUserLoading) {
    return <OrgLoader />;
  }

  if (isUserError) {
    return <div>Error fetching user information. Please try again.</div>;
  }

  return (
    <>
      <ToastProvider />
      <div className="container p-3 max-w-md ml-0">
        <div className="flex space-x-4 mb-4">
          <Button
            onClick={() => setView("create")}
            className={`flex items-center space-x-2 ${view === "create" ? "font-bold" : ""}`}
          >
            <FaPlus />
            <span>Create Organization</span>
          </Button>
          <Button
            onClick={() => setView("list")}
            className={`flex items-center space-x-2 ${view === "list" ? "font-bold" : ""}`}
          >
            <FaListAlt />
            <span>Organization List</span>
          </Button>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Create Organization</h2>

        {view === "create" ? (
          <div className="flex flex-col space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm text-gray-600 mb-2">
                  Organization Name
                </label>
                <Input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="border border-gray-300 rounded-md p-2"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Create Organization
              </Button>
            </form>

            <div className="flex flex-col">
              <label htmlFor="organizations" className="text-sm text-gray-600 mb-2">
                Select Organization
              </label>
              <select
                id="organizations"
                className="w-full border border-gray-300 rounded-md p-2"
                disabled={isFetchingOrganizations}
                value={selectedOrgId || ""}
                onChange={(e) => handleOrgChange(e.target.value)}
              >
                <option value="" disabled>
                  {isFetchingOrganizations
                    ? "Loading..."
                    : "Select an organization"}
                </option>
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name} {selectedOrgId === org.id && "✓"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <OrganizationList organizations={organizations} isFetching={isFetchingOrganizations} />
        )}
      </div>
    </>
  );
}
