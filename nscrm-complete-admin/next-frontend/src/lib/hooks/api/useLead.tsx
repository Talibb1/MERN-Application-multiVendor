// src/hooks/useLead.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createLead,
  getLeads,
  deleteLeadById,
  updateLeadById,
  getLeadById,
} from "../../services/api";
import { Lead, CreateLeadInput, ApiResponse } from "../../types";

export const useCreateLead = () => {
  return useMutation<ApiResponse<Lead>, unknown, CreateLeadInput>({
    mutationFn: async (leadData: CreateLeadInput) => {
      return await createLead(leadData);
    },
  });
};

export const useLeads = () => {
  return useQuery<ApiResponse<Lead[]>>({
    queryKey: ["leads"],
    queryFn: getLeads,
  });
};

export const useDeleteLead = () => {
  return useMutation<ApiResponse<null>, unknown, number>({
    mutationFn: async (id: number) => {
      return await deleteLeadById(id);
    },
  });
};

export const useUpdateLead = () => {
  return useMutation<
    ApiResponse<Lead>,
    unknown,
    { id: number; data: Partial<Lead> }
  >({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Lead> }) => {
      return await updateLeadById(id, data);
    },
  });
};

export const useGetLeadById = (id: number) => {
  return useQuery<ApiResponse<Lead>>({
    queryKey: ["lead", id],
    queryFn: () => getLeadById(id),
  });
};
