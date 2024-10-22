import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/custom/button';
import { notify } from '@/components/ui/Toast';
import { useDeleteLead } from '@/lib/hooks/api/useLead';
import { useLoading } from "@/components/ui/ui/loading";

type DeleteProps = {
  leadId: number;
  leadName: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
};

export function DeleteLeadPopup({ leadId, leadName, isOpen, onClose }: DeleteProps) {
  const { loading, startLoading, stopLoading } = useLoading(false);
  const deleteLead = useDeleteLead();

  const handleDelete = async () => {
    startLoading();
    try {
      await deleteLead.mutateAsync(leadId);
      notify("success", `${leadName} deleted successfully!`);
      onClose();
    } catch (err: any) {
      notify("error", err?.data?.message || "Failed to delete. Please try again.");
    } finally {
      stopLoading();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 dark:bg-black/60" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-[400px]">
            <Dialog.Title className="text-lg font-semibold dark:text-gray-100">Delete Lead</Dialog.Title>
            <Dialog.Description className="dark:text-gray-300">
              Are you sure you want to delete the lead <strong className="dark:text-gray-200">{leadName}</strong>? This action cannot be undone.
            </Dialog.Description>
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
