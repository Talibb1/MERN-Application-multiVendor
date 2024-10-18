"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/custom/button";
import Image from "next/image";

type ViewProps = {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  role: string;
  isOpen: boolean;
  onClose: () => void;
};

export function ViewLeadPopup({
  avatar,
  firstName,
  lastName,
  email,
  organization,
  role,
  isOpen,
  onClose,
}: ViewProps) {
  useEffect(() => {
    if (!isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/60">
      <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-lg font-semibold dark:text-gray-100 mb-4">User Details</h2>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex flex-col items-center col-span-2">
            <Image
              src={avatar || "/avatar_12.jpg"}
              alt={`${firstName} ${lastName}`}
              className="w-20 h-20 rounded-full mb-4"
              width={200}
              height={200}
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">First Name</h3>
            <p className="text-base dark:text-gray-100">{firstName || "N/A"}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Last Name</h3>
            <p className="text-base dark:text-gray-100">{lastName || "N/A"}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</h3>
            <p className="text-base dark:text-gray-100">{email || "N/A"}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Organization</h3>
            <p className="text-base dark:text-gray-100">{organization || "N/A"}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Role</h3>
            <p className="text-base dark:text-gray-100">{role || "N/A"}</p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-red-500 border-red-500 hover:bg-red-100 dark:hover:bg-red-500 dark:text-red-400 dark:border-red-400"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
