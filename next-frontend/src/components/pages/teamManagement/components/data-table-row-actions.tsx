import { useState } from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/custom/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/ui/dropdown-menu";
import { DeleteLeadPopup } from "./CRUD-Actions/DeleteLeads";
import { ViewLeadPopup } from "./CRUD-Actions/ViewLeads";
import { EditLeadPopup } from "./CRUD-Actions/EditLeads";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditPopupOpen(true);
  };

  const handleDelete = async () => {
    setIsDeletePopupOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onSelect={() => setIsViewPopupOpen(true)}>
            View
            <DropdownMenuShortcut>⌘⌥V</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleEditClick}>
            Edit
            <DropdownMenuShortcut>⌘⌥E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsDeletePopupOpen(true)}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteLeadPopup
        onDelete={handleDelete}
        leadId={row.original.id}
        leadName={row.original.companyName}
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
      />

      <ViewLeadPopup
        leadId={row.original.id}
        companyName={row.original.companyName}
        status={row.original.status}
        industry={row.original.industry}
        source={row.original.source}
        phone={row.original.phone}
        email={row.original.email}
        website={row.original.website}
        description={row.original.description}
        isOpen={isViewPopupOpen}
        onClose={() => setIsViewPopupOpen(false)}
      />

      <EditLeadPopup
        leadId={row.original.id}
        companyName={row.original.companyName}
        status={row.original.status}
        industry={row.original.industry}
        source={row.original.source}
        phone={row.original.phone}
        email={row.original.email}
        website={row.original.website}
        description={row.original.description}
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
      />
    </>
  );
}
