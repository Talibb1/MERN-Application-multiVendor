import axiosClient from "../axios/axiosClient";
import {
  LoginData,
  UserResponse,
  ApiResponse,
  CreateUserInput,
} from "../../types";

export const createUser = async (
  user: CreateUserInput
): Promise<ApiResponse<UserResponse>> => {
  try {
    const response = await axiosClient.post("register", user);
    return response.data;
  } catch (error: any) {
    console.error("Error in createUser:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : "An error occurred while creating the user.");
  }
};
export const loginUser = async (
  data: LoginData
): Promise<ApiResponse<UserResponse>> => {
  try {
    const response = await axiosClient.post("login", data);
    return response.data;
  } catch (error: any) {
    console.error("Error in loginUser:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : "An error occurred while logging in.");
  }
};

// Function to log out a user with error handling
export const logoutUser = async (): Promise<ApiResponse<null>> => {
  try {
    const response = await axiosClient.post("logout");
    return response.data;
  } catch (error: any) {
    console.error("Error in logoutUser:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : "An error occurred while logging out.");
  }
};

export const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}): Promise<ApiResponse<null>> => {
  try {
    const response = await axiosClient.post("changepassword", data);
    return response.data;
  } catch (error: any) {
    console.error("Error in changePassword:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : "An error occurred while changing the password.");
  }
};
