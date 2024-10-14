"use client";

import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";

interface ContactActionsDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

const opportunityActions: React.FC<ContactActionsDropdownProps> = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <FiMoreVertical
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg">
          <button
            className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
          >
            Edit
          </button>
          <button
            className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default opportunityActions;
