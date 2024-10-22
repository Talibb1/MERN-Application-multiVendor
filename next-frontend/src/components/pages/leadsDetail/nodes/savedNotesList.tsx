import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa'; 

interface Note {
  id: number;
  content: string;
  createdAt: string;
  leadId: number;
}

interface SavedNotesListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return date.toLocaleTimeString('en-US', options);
};

const SavedNotesList: React.FC<SavedNotesListProps> = ({ notes, onEdit, onDelete }) => {
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null); // Track editing note ID
  const [editedContent, setEditedContent] = useState<string>(''); // Track content being edited

  const handleEditClick = (note: Note) => {
    setEditingNoteId(note.id);       // Set the note being edited
    setEditedContent(note.content);  // Set the current content in the input
  };

  const handleSaveClick = (note: Note) => {
    // Trigger the onEdit function with updated content
    onEdit({ ...note, content: editedContent });
    setEditingNoteId(null); // Exit edit mode
  };

  const handleCancelClick = () => {
    setEditingNoteId(null); // Exit edit mode without saving
  };

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold mb-4 text-gray-700">Saved Notes</h3>
      <ul className="space-y-4">
        {notes.map((note) => (
          <li key={note.id} className="relative bg-white shadow-md rounded-lg p-4 border border-gray-200">
            
            {/* Timestamp on the top-right */}
            <div className="absolute top-2 right-4 text-xs text-gray-400">
              {formatDate(note.createdAt)}
            </div>

            {editingNoteId === note.id ? (
              // Editing mode: show textarea and save/cancel buttons
              <div>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full p-3 mb-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleSaveClick(note)}  // Handle saving edited content
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    aria-label="Save"
                  >
                    <FaSave className="mr-2" /> Save
                  </button>
                  <button
                    onClick={handleCancelClick}  // Handle cancel editing
                    className="inline-flex items-center px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                    aria-label="Cancel"
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Display mode: show note content and actions
              <div>
                <div className="text-gray-800 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: note.content }} />
              </div>
            )}

            {/* Icons for Edit and Delete with more space from the timestamp */}
            {editingNoteId !== note.id && (
              <div className="absolute top-4 right-16 flex space-x-2"> {/* Adjusted the position */}
                <button
                  onClick={() => handleEditClick(note)}  // Handle entering edit mode
                  className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition duration-150 ease-in-out"
                  aria-label="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(note.id)}  // Handle delete
                  className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition duration-150 ease-in-out"
                  aria-label="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedNotesList;
