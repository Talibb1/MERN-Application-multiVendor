import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createContact,
  getContacts,
  deleteContactById,
  updateContactById,
  getContactById,
} from '../../services/api';
import { Contact, CreateContactInput, ApiResponse } from '../../types';

// Hook for creating a contact
export const useCreateContact = () => {
  return useMutation<ApiResponse<void>, unknown, CreateContactInput>({
    mutationFn: createContact,
  });
};

// Hook for fetching all contacts
export const useContacts = () => {
  return useQuery<ApiResponse<Contact[]>>({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });
};

// Hook for deleting a contact by ID
export const useDeleteContact = () => {
  return useMutation<ApiResponse<null>, unknown, number>({
    mutationFn: (id: number) => deleteContactById(id),
  });
};

// Hook for updating a contact
export const useUpdateContact = () => {
  return useMutation<ApiResponse<Contact>, unknown, { id: number; data: Partial<Contact> }>({
    mutationFn: ({ id, data }) => updateContactById(id, data),
  });
};

// Hook for fetching a contact by ID
export const useGetContactById = (id: number) => {
  return useQuery<ApiResponse<Contact>>({
    queryKey: ['contact', id],
    queryFn: () => getContactById(id),
  });
};
