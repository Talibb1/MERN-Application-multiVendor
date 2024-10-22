import axiosClient from '../axios/axiosClient';
import { Contact, CreateContactInput, ApiResponse } from '../../types';

// Function to create a contact with error handling
export const createContact = async (contact: CreateContactInput): Promise<ApiResponse<void>> => {
  try {
    const response = await axiosClient.post('createcontacts', contact);
    return { data: response.data, error: null };
  } catch (error: any) {
    console.error("Error in createContact:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : "An error occurred while creating the contact.");
  }
};

// Function to get all contacts with error handling
export const getContacts = async (): Promise<ApiResponse<Contact[]>> => {
  try {
    const response = await axiosClient.get('getcontacts');
    return response.data;
  } catch (error: any) {
    console.error("Error in getContacts:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : "An error occurred while fetching contacts.");
  }
};

// Function to delete a contact by ID with error handling
export const deleteContactById = async (id: number): Promise<ApiResponse<null>> => {
  try {
    const response = await axiosClient.delete(`deletecontacts/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error in deleteContactById for ID ${id}:`, error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : `An error occurred while deleting the contact with ID ${id}.`);
  }
};

// Function to update a contact by ID with error handling
export const updateContactById = async (id: number, contactData: Partial<Contact>): Promise<ApiResponse<Contact>> => {
  try {
    const response = await axiosClient.put(`updatecontacts/${id}`, contactData);
    return response.data;
  } catch (error: any) {
    console.error(`Error in updateContactById for ID ${id}:`, error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : `An error occurred while updating the contact with ID ${id}.`);
  }
};

// Function to get a contact by ID with error handling
export const getContactById = async (id: number): Promise<ApiResponse<Contact>> => {
  try {
    const response = await axiosClient.get(`getcontacts/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error in getContactById for ID ${id}:`, error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : `An error occurred while fetching the contact with ID ${id}.`);
  }
};
