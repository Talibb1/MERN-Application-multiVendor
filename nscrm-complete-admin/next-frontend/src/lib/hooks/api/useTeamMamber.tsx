import { useMutation, useQuery } from "@tanstack/react-query";
import { createTeamMember, deleteTeamMember, getTeamMembers, updateTeamMember } from "../../services/api";
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
    return useMutation<ApiResponse<null>, unknown, { email: string; organizationId: number }>({
      mutationFn: async ({ email, organizationId }) => {
        return await deleteTeamMember(email, organizationId);
      },
    });
  };
  export const useUpdateTeamMember = () => {
    return useMutation<ApiResponse<User>, unknown, UpdateTeamMemberInput>({
      mutationFn: async (data: UpdateTeamMemberInput) => {
        return await updateTeamMember(data);
      },
    });
  }