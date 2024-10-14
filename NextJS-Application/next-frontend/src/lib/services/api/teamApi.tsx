import axiosClient from "../axios/axiosClient";
import { ApiResponse, User, CreateTeamMemberInput, UpdateTeamMemberInput } from "../../types";

// Create a team member and assign role
export const createTeamMember = async (teamMember: CreateTeamMemberInput): Promise<ApiResponse<User>> => {
  try {
    const response = await axiosClient.post<ApiResponse<User>>("createteam", teamMember);
    return response.data;
  } catch (error: any) {
    console.error("Error in createTeamMember:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : "An error occurred while adding the team member.");
  }
};

// Get team members with error handling
export const getTeamMembers = async (id: number): Promise<ApiResponse<User[]>> => {
  try {
    console.log("Fetching team members for organizationId:", id); // Debug log
    const response = await axiosClient.get<ApiResponse<User[]>>(`getteams/${id}`);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error in getTeamMembers:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : "An error occurred while fetching the team members.");
  }
};


// Delete team member by ID with error handling
export const deleteTeamMemberById = async (id: number): Promise<ApiResponse<null>> => {
  try {
    const response = await axiosClient.delete<ApiResponse<null>>(`deleteteam/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error in deleteTeamMemberById for Team Member ID ${id}:`, error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : `An error occurred while deleting the team member for ID ${id}.`);
  }
};

// Update team member by ID with error handling
export const updateTeamMemberById = async (id: number, teamMemberData: UpdateTeamMemberInput): Promise<ApiResponse<User>> => {
  try {
    const response = await axiosClient.put<ApiResponse<User>>(`updatteam/${id}`, teamMemberData);
    return response.data;
  } catch (error: any) {
    console.error(`Error in updateTeamMemberById for Team Member ID ${id}:`, error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : `An error occurred while updating the team member for ID ${id}.`);
  }
};

