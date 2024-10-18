"use client";

import { useEffect, useRef, useState } from "react";
import { FiUsers, FiChevronDown } from "react-icons/fi";
import { Button } from "@/components/custom/button";
import { useGetUser, useGetTeamMembers } from "@/lib/hooks/api";

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]); // Track selected users
  const dropdownRef = useRef<HTMLDivElement | null>(null); // For detecting outside clicks

  // Fetch the user's organization ID and use it for fetching team members
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useGetUser();
  const organizationId = userData?.user?.organizationId;

  const orgId = organizationId ?? 0; // Fallback to 0 if undefined
  const {
    data: teamMembersResponse,
    error,
    isLoading,
    isFetching,
  } = useGetTeamMembers(orgId);

  // Ensure correct type access
  const teamMembers: User[] = (teamMembersResponse || []) as User[];

  // Toggle dropdown
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle user selection
  const handleSelectUser = (userId: number) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        // If the user is already selected, remove them
        return prev.filter((id) => id !== userId);
      } else {
        // If not selected, add to selection
        return [...prev, userId];
      }
    });
  };

  // Handle select all users
  const handleSelectAll = () => {
    if (selectedUsers.length === teamMembers.length) {
      // If all are selected, deselect all
      setSelectedUsers([]);
    } else {
      // Select all users
      setSelectedUsers(teamMembers.map((user) => Number(user.id)));
    }
  };
  if (userError || error) {
    const errorMessage =
      userError?.message || error?.message || "Unknown error occurred.";
    return <p>Error: {errorMessage}</p>;
  }
  if (userLoading || isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        className="h-8 bg-black text-white hover:bg-gray-800 hover:text-white flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-700"
        onClick={toggleDropdown}
      >
        <FiUsers className="h-4 w-4" />
        {selectedUsers.length > 0
          ? `${selectedUsers.length} User(s) Selected`
          : "All Users"}
        <FiChevronDown className="h-4 w-4" />
      </Button>
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-10">
          <ul>
            <li className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer text-black dark:text-white">
              <input
                type="checkbox"
                checked={selectedUsers.length === teamMembers.length}
                onChange={handleSelectAll}
                className="mr-2"
              />
              All Users
            </li>

            {/* Separator line */}
            <hr className="border-gray-300 dark:border-gray-600 my-1" />

            {teamMembers.length > 0 ? (
              teamMembers.map((user: User) => (
                <li
                  key={user.id}
                  className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer text-black dark:text-white"
                >
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)} // Check if the user is selected
                    onChange={() => handleSelectUser(user.id)} // Update selection state
                    className="mr-2"
                  />
                  {user.user.firstName} {user.user.lastName}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500 dark:text-gray-400">
                No team members.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
