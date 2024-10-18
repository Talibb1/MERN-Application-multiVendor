import { useMutation } from "@tanstack/react-query";
import {
  createUser,
  loginUser,
  logoutUser,
  changePassword,
} from "../../services/api";
import {
  UserResponse,
  ApiResponse,
  LoginData,
  CreateUserInput,
} from "../../types";

export const useCreateUser = () => {
  return useMutation<ApiResponse<UserResponse>, unknown, CreateUserInput>({
    mutationFn: createUser,
  });
};

export const useLoginUser = () => {
  return useMutation<ApiResponse<UserResponse>, unknown, LoginData>({
    mutationFn: loginUser,
  });
};

export const useLogoutUser = () => {
  return useMutation<ApiResponse<null>, unknown>({
    mutationFn: logoutUser,
  });
};

export const useChangePassword = () => {
  return useMutation<ApiResponse<null>, unknown, { oldPassword: string; newPassword: string }>({
    mutationFn: changePassword,
  });
};
