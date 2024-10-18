import React, { useState } from 'react';
import { Button } from "@/components/custom/button";
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useDeleteOrganization, useUpdateOrganization } from '@/lib/hooks/api'; // Hooks for API calls
import { format } from 'date-fns'; // For date formatting

const OrganizationList = ({ organizations, isFetching }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const itemsPerPage = 5; // Number of items per page

  const { mutate: deleteOrganization } = useDeleteOrganization(); 
  const { mutate: updateOrganization } = useUpdateOrganization();

  const handleEdit = (org) => {
    setEditingId(org.id);
    setUpdatedName(org.name); // Set current name to input
  };

  const handleSave = (id) => {
    updateOrganization({ id, data: { name: updatedName } }, {
      onSuccess: () => {
        console.log(`Organization with ID: ${id} updated.`);
        setEditingId(null); // Reset editing state
      },
    });
  };

  const handleCancel = () => {
    setEditingId(null); // Reset editing state
  };

  const handleDelete = (id) => {
    deleteOrganization(id, {
      onSuccess: () => {
        console.log(`Organization with ID: ${id} deleted.`);
      },
    });
  };

  // Calculate the current organizations to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrganizations = organizations.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(organizations.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg space-y-4 w-full">
      {isFetching ? (
        <p>Loading...</p>
      ) : organizations.length === 0 ? (
        <p>No organizations found.</p>
      ) : (
        <>
          <table className="min-w-full table-fixed divide-y divide-gray-200 mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-2/4 px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                  Organization Name
                </th>
                <th className="w-1/4 px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                  Created On
                </th>
                <th className="w-1/4 px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentOrganizations.map((org) => (
                <tr key={org.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === org.id ? (
                      <input
                        type="text"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        className="border p-2 rounded"
                      />
                    ) : (
                      org.name
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Format the creation date */}
                    {format(new Date(org.createdAt), 'PPP')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === org.id ? (
                      <>
                        <Button onClick={() => handleSave(org.id)} className="mr-2">
                          Save
                        </Button>
                        <Button onClick={handleCancel} className="text-red-600">
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => handleEdit(org)} className="mr-2 flex items-center">
                          <FiEdit className="mr-1" />
                        </Button>
                        <Button onClick={() => handleDelete(org.id)} className="text-red-600 flex items-center">
                          <FiTrash className="mr-1" />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-end items-center space-x-4">
            <Button
              onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)}
              disabled={currentPage === 1}
              className="mr-2"
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : currentPage)}
              disabled={currentPage === totalPages}
              className="ml-2"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrganizationList;
