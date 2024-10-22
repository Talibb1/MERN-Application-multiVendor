import { Button } from '@/components/custom/button';
import { notify } from '@/components/ui/Toast';
import { useDeleteContact } from '@/lib/hooks/api';
import { useLoading } from "@/components/ui/ui/loading";
import { useEffect } from 'react';

type DeleteProps = {
  contactId: number;
  contactName: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
};

export function DeleteLeadPopup({ contactId, contactName, isOpen, onClose }: DeleteProps) {
  const { loading, startLoading, stopLoading } = useLoading(false);
  const deleteLead = useDeleteContact();

  const handleDelete = async () => {
    startLoading();
    try {
      await deleteLead.mutateAsync(contactId);
      notify("success", `${contactName} deleted successfully!`);
      onClose();
    } catch (err: any) {
      notify("error", err?.data?.message || "Failed to delete. Please try again.");
    } finally {
      stopLoading();
    }
  };
  useEffect(() => {
    if (!isOpen) onClose();
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/60">
      <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-lg font-semibold dark:text-gray-100">Delete Lead</h2>
        <p className="mt-2 dark:text-gray-300">
          Are you sure you want to delete the lead{' '}
          <strong className="dark:text-gray-200">{contactName}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-red-500 border-red-500 hover:bg-red-100 dark:hover:bg-red-500 dark:text-red-400 dark:border-red-400"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
