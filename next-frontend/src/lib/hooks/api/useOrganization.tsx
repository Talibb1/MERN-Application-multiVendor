import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createOrganization,
  getOrganizationById,
  deleteOrganizationById,
  updateOrganizationById,
} from "../../services/api";
import { Organization, CreateOrganizationInput, ApiResponse } from "../../types";

// Create Organization hook
export const useCreateOrganization = () => {
  return useMutation<ApiResponse<Organization>, unknown, CreateOrganizationInput>({
    mutationFn: async (organizationData: CreateOrganizationInput) => {
      return await createOrganization(organizationData);
    },
  });
};

// Get Organization by ID hook
export const useGetOrganizationById = (id: number) => {
  return useQuery<ApiResponse<Organization>>({
    queryKey: ["organization", id],
    queryFn: () => getOrganizationById(id),
  });
};

// Delete Organization by ID hook
export const useDeleteOrganization = () => {
  return useMutation<ApiResponse<null>, unknown, number>({
    mutationFn: async (id: number) => {
      return await deleteOrganizationById(id);
    },
  });
};

// Update Organization by ID hook
export const useUpdateOrganization = () => {
  return useMutation<
    ApiResponse<Organization>,
    unknown,
    { id: number; data: Partial<Organization> }
  >({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Organization> }) => {
      return await updateOrganizationById(id, data);
    },
  });
};
