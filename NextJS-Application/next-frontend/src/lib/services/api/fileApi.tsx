import axiosClient from '../axios/axiosClient';
import { ApiResponse } from '../../types';

export const uploadCsv = async (formData: FormData): Promise<ApiResponse<void>> => {
    try {
        const response = await axiosClient.post('/upload-csv', formData);
        return response.data;
    } catch (error: any) {
        console.error("Error in uploadCsv:", error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.message : "An error occurred while uploading the CSV file.");
    }
};
