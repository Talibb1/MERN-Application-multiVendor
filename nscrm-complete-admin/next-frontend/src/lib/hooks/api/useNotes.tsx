import { useMutation, useQuery } from '@tanstack/react-query';
import { createNotes, getNotesByLeadId, deleteNotes, updateNotes } from '../../services/api'; 
import { CreateNotes, ApiResponse, Lead } from '../../types';


export const useCreateNotes = () => {
  return useMutation<ApiResponse<void>, unknown, CreateNotes>({
    mutationFn: (notesData) => createNotes(notesData),
  });
};

export const useGetNotesByLeadId = (id: number) => {
  return useQuery<ApiResponse<Lead>>({
    queryKey: ['leadNotes', id],
    queryFn: () => getNotesByLeadId(id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useDeleteNotes = () => {
  return useMutation<ApiResponse<null>, unknown, number>({
    mutationFn: (id: number) => deleteNotes(id),
  });
};

export const useUpdateNotes = () => {
  return useMutation<ApiResponse<void>, unknown, { id: number; data: Partial<CreateNotes> }>({
    mutationFn: ({ id, data }) => updateNotes(id, data),
  });
};
