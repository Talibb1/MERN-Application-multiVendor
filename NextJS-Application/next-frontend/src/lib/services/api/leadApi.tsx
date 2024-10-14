import axiosClient from "../axios/axiosClient";
import { Lead, CreateLeadInput, ApiResponse } from "../../types";

// Updated createLead function with error handling
export const createLead = async (lead: CreateLeadInput): Promise<ApiResponse<Lead>> => {
  try {
    const response = await axiosClient.post<ApiResponse<Lead>>("createleads", lead);
    return response.data;
  } catch (error: any) {
    console.error("Error in createLead:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : "An error occurred while creating the lead.");
  }
};
export const getLeads = async (): Promise<ApiResponse<Lead[]>> => {
  try {
    const response = await axiosClient.get("getleads");
    return response.data;
  } catch (error: any) {
    console.error("Error in getLeads:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : "An error occurred while fetching the leads.");
  }
};

// Delete lead by ID with error handling
export const deleteLeadById = async (id: number): Promise<ApiResponse<null>> => {
  try {
    const response = await axiosClient.delete(`deleteleads/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error in deleteLeadById for Lead ID ${id}:`, error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : `An error occurred while deleting the lead for ID ${id}.`);
  }
};

// Update lead by ID with error handling
export const updateLeadById = async (id: number, leadData: Partial<Lead>): Promise<ApiResponse<Lead>> => {
  try {
    const response = await axiosClient.put(`updateleads/${id}`, leadData);
    return response.data;
  } catch (error: any) {
    console.error(`Error in updateLeadById for Lead ID ${id}:`, error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : `An error occurred while updating the lead for ID ${id}.`);
  }
};

// Get lead by ID with error handling
export const getLeadById = async (id: number): Promise<ApiResponse<Lead>> => {
  try {
    const response = await axiosClient.get(`getleads/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error in getLeadById for Lead ID ${id}:`, error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : `An error occurred while fetching the lead for ID ${id}.`);
  }
};
