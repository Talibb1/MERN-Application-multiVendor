import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useDeleteContact } from "@/lib/hooks/api";

interface Contact {
  id: number;
  contactName: string;
}

interface ContactListProps {
  contacts: Contact[];
  onEdit: (index: number) => void;
  setNotify: (type: 'success' | 'error', message: string) => void; // New prop
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onEdit, setNotify }) => {
  const deleteContact = useDeleteContact(); // Mutation hook

  const handleDelete = async (id: number) => {
    try {
      await deleteContact.mutateAsync(id); // API call to delete contact
      setNotify('success', "Contact deleted successfully!"); // Show success toast
    } catch (error) {
      setNotify('error', "Error occurred while deleting contact."); // Show error toast
    }
  };

  return (
    <div className="space-y-4">
      {contacts.length > 0 ? (
        <div className="space-y-2 mt-4">
          {contacts.map((contact, index) => (
            <div
              key={contact.id}
              className="flex justify-between items-center p-2 border rounded-md bg-gray-100 dark:bg-gray-800 transition-colors"
            >
              <div>{contact.contactName}</div>
              <div className="flex items-center gap-2">
                <FiEdit className="cursor-pointer" onClick={() => onEdit(index)} />
                <FiTrash2
                  className="cursor-pointer"
                  onClick={() => handleDelete(contact.id)}
                  style={{ color: 'red' }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No contacts available.</p>
      )}
    </div>
  );
};

export default ContactList;
