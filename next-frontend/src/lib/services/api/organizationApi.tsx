import axiosClient from "../axios/axiosClient";
import { Organization, CreateOrganizationInput, ApiResponse } from "../../types";

export const createOrganization = async (organization: CreateOrganizationInput): Promise<ApiResponse<Organization>> => {
  try {
    const response = await axiosClient.post<ApiResponse<Organization>>("createorganization", organization);
    return response.data;
  } catch (error: any) {
    console.error("Error in createOrganization:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : "An error occurred while creating the organization.");
  }
};
  
  // Get organization by ID with error handling
  export const getOrganizationById = async (id: number): Promise<ApiResponse<Organization>> => {
    try {
      const response = await axiosClient.get(`getorganizations/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Error in getOrganizationById for Organization ID ${id}:`, error.response ? error.response.data : error.message);
      throw new Error(error.response ? error.response.data.message : `An error occurred while fetching the organization for ID ${id}.`);
    }
  };

  export const deleteOrganizationById = async (id: number): Promise<ApiResponse<null>> => {
    try {
      const response = await axiosClient.delete(`deleteorganizations/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Error in deleteOrganizationById for Organization ID ${id}:`, error.response ? error.response.data : error.message);
      throw new Error(error.response ? error.response.data.message : `An error occurred while deleting the organization for ID ${id}.`);
    }
  };

  export const updateOrganizationById = async (id: number, organizationData: Partial<Organization>): Promise<ApiResponse<Organization>> => {
    try {
      const response = await axiosClient.put(`updateorganizations/${id}`, organizationData);
      return response.data;
    } catch (error: any) {
      console.error(`Error in updateOrganizationById for Organization ID ${id}:`, error.response ? error.response.data : error.message);
      throw new Error(error.response ? error.response.data.message : `An error occurred while updating the organization for ID ${id}.`);
    }
  };