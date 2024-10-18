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
import { DeleteTeamMemberPopup } from "./CRUD-Actions/DeleteLeads";
import { ViewLeadPopup } from "./CRUD-Actions/ViewLeads";
import { EditRolePopup } from "./CRUD-Actions/EditLeads";
import React from "react";

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

  console.log("Row:", row.original.user);
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
      <DeleteTeamMemberPopup
        onDelete={handleDelete}
        organizationId={row.original.organizationId}
        email={row.original.user.email}
        memberName={row.original.user.firstName}
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
      />

      <ViewLeadPopup
        avatar={row.original.user.avatar}
        firstName={row.original.user.firstName}
        lastName={row.original.user.lastName}
        email={row.original.user.email}
        organization={row.original.organization.name}
        role={row.original.role}
        isOpen={isViewPopupOpen}
        onClose={() => setIsViewPopupOpen(false)}
      />

      <EditRolePopup
        organizationId={row.original.organizationId}
        currentRole={row.original.role}
        email={row.original.user.email}
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
      />
    </>
  );
}
