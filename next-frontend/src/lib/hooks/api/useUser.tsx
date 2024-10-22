import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, updateUser, deleteUser } from "../../services/api";
import { UserResponse, ApiResponse, User } from "../../types";


export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser, 
    staleTime: 5 * 60 * 1000,
  });
};


export const useUpdateUser = () => {
  return useMutation<ApiResponse<UserResponse>, unknown, { id: number; userData: Partial<User> }>({
    mutationFn: async ({ id, userData }: { id: number; userData: Partial<User> }) => {
      return await updateUser(id, userData);
    },
  });
};

export const useDeleteUser = () => {
  return useMutation<ApiResponse<null>, unknown, number>({
    mutationFn: async (id: number) => {
      return await deleteUser(id);
    },
  });
};
