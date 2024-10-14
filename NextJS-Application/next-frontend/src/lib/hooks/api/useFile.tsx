import { useMutation } from '@tanstack/react-query';
import { uploadCsv } from '../../services/api';
import { ApiResponse } from '../../types';

export const useUploadCsv = () => {
  return useMutation<ApiResponse<void>, unknown, FormData>({
    mutationFn: async (formData: FormData) => {
      const response = await uploadCsv(formData);
      return response;
    },
  });
};
