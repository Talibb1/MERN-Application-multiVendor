import { useMutation, useQuery } from "@tanstack/react-query";
import { createTeamMember, deleteTeamMemberById, getTeamMembers, updateTeamMemberById } from "../../services/api";
import { ApiResponse, User, CreateTeamMemberInput, UpdateTeamMemberInput } from "../../types";

export const useCreateTeamMember = () => {
  return useMutation<ApiResponse<User>, unknown, CreateTeamMemberInput>({
    mutationFn: async (teamMemberData: CreateTeamMemberInput) => {
      return await createTeamMember(teamMemberData);
    },
  });
};

export const useGetTeamMembers = (id: number) => {
    return useQuery<ApiResponse<User[]>>({
      queryKey: ["teamMembers", id],
      queryFn: () => getTeamMembers(id),
    });
  };

export const useDeleteTeamMember = () => {
    return useMutation<ApiResponse<null>, unknown, number>({
      mutationFn: async (id: number) => {
        return await deleteTeamMemberById(id);
      },
    });
  };
  export const useUpdateTeamMember = () => {
    return useMutation<ApiResponse<User>, unknown, { id: number; data: UpdateTeamMemberInput }>({
      mutationFn: async ({ id, data }: { id: number; data: UpdateTeamMemberInput }) => {
        return await updateTeamMemberById(id, data);
      },
    });
  };