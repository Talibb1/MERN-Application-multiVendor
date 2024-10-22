"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/custom/button";

type ViewProps = {
  leadId: number;
  companyName: string;
  status: string;
  industry: string;
  source: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
};

export function ViewLeadPopup({
  leadId,
  companyName,
  status,
  industry,
  source,
  phone,
  email,
  website,
  description,
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
        <h2 className="text-lg font-semibold dark:text-gray-100 mb-4">Lead Details</h2>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Company Name</h3>
            <p className="text-base dark:text-gray-100">{companyName || "N/A"}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Status</h3>
            <p className="text-base dark:text-gray-100">{status || "N/A"}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Industry</h3>
            <p className="text-base dark:text-gray-100">{industry || "N/A"}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Source</h3>
            <p className="text-base dark:text-gray-100">{source || "N/A"}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Phone</h3>
            <p className="text-base dark:text-gray-100">{phone || "N/A"}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</h3>
            <p className="text-base dark:text-gray-100">{email || "N/A"}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Website</h3>
            <p className="text-base dark:text-gray-100">{website || "N/A"}</p>
          </div>
          <div className="flex flex-col col-span-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</h3>
            <p className="text-base dark:text-gray-100">{description || "N/A"}</p>
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
