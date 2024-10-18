import axiosClient from "../axios/axiosClient";
import { ApiResponse, User, CreateTeamMemberInput, UpdateTeamMemberInput } from "../../types";


export const createTeamMember = async (teamMember: CreateTeamMemberInput): Promise<ApiResponse<User>> => {
  try {
    const response = await axiosClient.post<ApiResponse<User>>("teams/createteam", teamMember);
    return response.data;
  } catch (error: any) {
    console.error("Error in createTeamMember:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : "An error occurred while adding the team member.");
  }
};

export const getTeamMembers = async (id: number): Promise<ApiResponse<User[]>> => {
  try {
    console.log("Fetching team members for organizationId:", id);
    const response = await axiosClient.get<ApiResponse<User[]>>(`teams/getteams/${id}`);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error in getTeamMembers:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : "An error occurred while fetching the team members.");
  }
};

export const deleteTeamMember = async (email: string, organizationId: number): Promise<ApiResponse<null>> => {
  try {
    const response = await axiosClient.delete<ApiResponse<null>>(`teams/deleteteam`, {
      data: { email, organizationId },
    });
    return response.data;
  } catch (error: any) {
    console.error(`Error deleting Team Member with email ${email}:`, error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : `An error occurred while deleting the team member with email ${email}.`);
  }
};

export const updateTeamMember = async (teamMemberData: UpdateTeamMemberInput): Promise<ApiResponse<User>> => {
  try {
    const response = await axiosClient.put<ApiResponse<User>>(`teams/updatteam`, teamMemberData);
    return response.data;
  } catch (error: any) {
    console.error(`Error in updateTeamMember:`, error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : `An error occurred while updating the team member.`);
  }
};