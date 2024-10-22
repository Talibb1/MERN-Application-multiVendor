"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/custom/button";

type ViewProps = {
  contactId: number;
  contactName: string;
  title?: string;
  email?: string;
  phone?: string;
  position?: string;
  contactDetails?: string;
  isOpen: boolean;
  onClose: () => void;
};

export function ViewLeadPopup({
  contactId,
  contactName,
  title,
  email,
  phone,
  position,
  contactDetails,
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
        <h2 className="text-lg font-semibold dark:text-gray-100 mb-4">Contact Details</h2>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          {/* Contact Name */}
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Contact Name</h3>
            <p className="text-base dark:text-gray-100">{contactName || "N/A"}</p>
          </div>

          {/* Title */}
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Title</h3>
            <p className="text-base dark:text-gray-100">{title || "N/A"}</p>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</h3>
            <p className="text-base dark:text-gray-100">{email || "N/A"}</p>
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Phone</h3>
            <p className="text-base dark:text-gray-100">{phone || "N/A"}</p>
          </div>

          {/* Position */}
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Position</h3>
            <p className="text-base dark:text-gray-100">{position || "N/A"}</p>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col col-span-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Contact Details</h3>
            <p className="text-base dark:text-gray-100">{contactDetails || "N/A"}</p>
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
