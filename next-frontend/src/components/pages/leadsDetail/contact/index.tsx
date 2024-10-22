import React, { useState, useMemo, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import { FiSearch, FiPlus, FiX } from "react-icons/fi";
import { debounce } from "lodash";
import { Button } from "@/components/custom/button";
import { Contact } from "@/lib/types";
import { notify } from "@/components/ui/Toast";

const ContactsManager = ({ leadData, leadId }) => {
  const [contacts, setContacts] = useState<Contact[]>(leadData || []);
  const [contactForms, setContactForms] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  console.log(contacts);
  // Handle adding a contact form with a unique ID
  const handleAddContact = () => {
    setContactForms((prevForms) => [...prevForms, uuidv4()]);
    setEditIndex(null);
  };

  const handleEditContact = (index: number) => {
    setEditIndex(index);
    setContactForms([]); // Close all forms when editing
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.contactName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [contacts, searchQuery]);

  const handleCancelForm = (formId: string) => {
    setContactForms((prevForms) => prevForms.filter((id) => id !== formId));
  };

  return (
    <div className="space-y-4">
      {isSearchActive ? (
        <div className="flex items-center border border-gray-300 px-4 py-2 rounded-md">
          <input
            placeholder="Search contacts..."
            className="w-full"
            onChange={handleSearchChange}
          />
          <FiX
            className="cursor-pointer ml-2"
            onClick={() => setIsSearchActive(false)}
          />
        </div>
      ) : (
        <div className="flex items-center border border-gray-300 px-4 py-2 rounded-md">
          <span className="mr-2">Manage Contacts</span>
          <div className="ml-auto flex items-center gap-2">
            <FiSearch
              className="cursor-pointer"
              onClick={() => setIsSearchActive(true)}
            />
            <Button
              onClick={handleAddContact}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FiPlus />
            </Button>
          </div>
        </div>
      )}

      {/* Contact List */}
      <ContactList
        contacts={filteredContacts}
        onEdit={handleEditContact}
        setNotify={(type, message) => notify(type, message)}
      />

      {/* Render Add Contact Forms */}
      {contactForms.map((formId) => (
        <div key={formId} className="border p-4 rounded-md space-y-4">
          <h2>Add Contact</h2>
          <ContactForm
            key={formId}
            leadId={leadId}
            onCancel={() => handleCancelForm(formId)}
          />
        </div>
      ))}

      {/* Edit Contact Form */}
      {editIndex !== null && (
        <div className="border p-4 rounded-md space-y-4">
          <h2>Edit Contact</h2>
          <ContactForm
            leadId={leadId}
            contactsData={contacts[editIndex]}
            isEdit
            onCancel={() => setEditIndex(null)}
          />
        </div>
      )}
    </div>
  );
};

export default ContactsManager;
