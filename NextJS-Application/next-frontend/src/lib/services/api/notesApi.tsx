import axiosClient from '../axios/axiosClient';
import { CreateNotes, ApiResponse, Lead, UpdateNotes } from '../../types';

// Function to create notes with error handling
export const createNotes = async (notesData: CreateNotes): Promise<ApiResponse<void>> => {
  try {
    const response = await axiosClient.post('/createnotes', notesData);
    return response.data;
  } catch (error: any) {
    console.error("Error in createNotes:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : "An error occurred while creating notes.");
  }
};

export const getNotesByLeadId = async (id: number): Promise<ApiResponse<Lead>> => {
  try {
    const response = await axiosClient.get(`getleadnotes/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error in getNotesByLeadId for Lead ID ${id}:`, error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : `An error occurred while fetching notes for Lead ID ${id}.`);
  }
};


export const deleteNotes = async (id: number): Promise<ApiResponse<null>> => {
  try {
    const response = await axiosClient.delete(`/deletenote/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error in deleteNotes for Note ID ${id}:`, error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : `An error occurred while deleting the note for ID ${id}.`);
  }
};


export const updateNotes = async (id: number, notesData: UpdateNotes): Promise<ApiResponse<void>> => {
  try {
    const response = await axiosClient.put(`/updatenote/${id}`, notesData);
    return response.data;
  } catch (error: any) {
    console.error(`Error in updateNotes for Note ID ${id}:`, error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : `An error occurred while updating the note for ID ${id}.`);
  }
};
