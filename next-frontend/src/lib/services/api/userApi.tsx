import axiosClient from "../axios/axiosClient";
import { UserResponse, ApiResponse, ProfileResponse, User } from "../../types";

export const getUser = async (): Promise<ApiResponse<ProfileResponse>> => {
  try {
    const response = await axiosClient.get("userProfile");
    return response.data;
  } catch (error: any) {
    console.error("Error in getUser:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : "An error occurred while fetching user profile.");
  }
};


export const deleteUser = async (id: number): Promise<ApiResponse<null>> => {
  try {
    const response = await axiosClient.delete(`deleteuser/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error in deleteUser:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : `An error occurred while deleting user with ID ${id}.`);
  }
};

export const updateUser = async (
  id: number,
  userData: Partial<User>
): Promise<ApiResponse<UserResponse>> => {
  try {
    const response = await axiosClient.put(`updateuser/${id}`, userData);
    return response.data;
  } catch (error: any) {
    console.error("Error in updateUser:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : `An error occurred while updating user with ID ${id}.`);
  }
};
