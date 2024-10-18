"use client";

import { useState } from 'react';
import { DotsHorizontalIcon} from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { Button } from '@/components/custom/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/ui/dropdown-menu';
import { DeleteLeadPopup } from './CRUD-Actions/DeleteContacts';
import { ViewLeadPopup } from './CRUD-Actions/ViewContacts';
import { EditLeadPopup } from './CRUD-Actions/EditContacts';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
interface Lead {
  id: number;
  contactName: string;
  title:string;
  email: string;
  phone: string;
  position: string; 
  contactDetails: string;
}


export function DataTableRowActions<TData extends Lead>({ row }: DataTableRowActionsProps<TData>) {
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); 

  const handleDelete = async () => {
    setIsDeletePopupOpen(false);
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem onSelect={() => setIsViewPopupOpen(true)}>View
          <DropdownMenuShortcut>⌘⌥V</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsEditPopupOpen(true)}>Edit
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
        contactId={row.original.id}
        contactName={row.original.contactName}
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
      />

      <ViewLeadPopup
        contactId={row.original.id}
        contactName={row.original.contactName}
        title={row.original.title}
        email={row.original.email}
        phone={row.original.phone}
        position={row.original.position}
        contactDetails={row.original. contactDetails}
        isOpen={isViewPopupOpen}
        onClose={() => setIsViewPopupOpen(false)}
      />

      <EditLeadPopup
        contactId={row.original.id}
        contactName={row.original.contactName}
        title={row.original.title}
        email={row.original.email}
        phone={row.original.phone}
        position={row.original.position}
        contactDetails={row.original. contactDetails}
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
      />
    </>
  );
}
