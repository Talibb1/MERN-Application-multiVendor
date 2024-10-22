import { useRouter } from 'next/navigation';
import { ColumnDef, Row } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

const dynamicColumns = [
  { key: 'id', label: 'ID', width: '80px', sortable: false, hideable: false },
  { key: 'companyName', label: 'Company Name', filter: true},
  { key: 'contacts', label: 'Contacts Name', filter: true },
  { key: 'status', label: 'Status', filter: true },
];

export const columns: ColumnDef<any, any>[] = [
  {
    id: 'select',
    header: ({ table }: { table: any }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }: { row: Row<any> }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  
  // {
  //   accessorKey: 'user', // Adding a user column to display user information with image
  //   header: ({ column }: { column: ColumnDef<any> }) => (
  //     <DataTableColumnHeader column={column} title="User" />
  //   ),
  //   cell: ({ row }: { row: Row<any> }) => {
  //     const user = row.original.user as { image: string; name: string; role: string };
  //     return (
  //       <div className="flex items-center">
  //         {/* <Image src={user.image} alt={user.name} width={40} height={40} className="rounded-full mr-2" /> */}
  //         <div>
  //           <div className="font-bold">{user.name}</div>
  //           <div className="text-muted-foreground">{user.role}</div>
  //         </div>
  //       </div>
  //     );
  //   },
  // },

  {
    accessorKey: 'email',
    header: ({ column }: { column: ColumnDef<any> }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }: { row: Row<any> }) => {
      const email = row.getValue('email') as string;
      return (
        <div className="flex items-center">
          <a
            href={`mailto:${email}`}
            className="text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300 flex items-center"
          >
            <FaEnvelope className="mr-2" />
            {email}
          </a>
        </div>
      );
    },
    filterFn: (row: Row<any>, id: string, filterValue: any) => {
      const email = row.getValue(id) as string;
      return email.includes(filterValue);
    },
  },

  {
    accessorKey: 'phone',
    header: ({ column }: { column: ColumnDef<any> }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }: { row: Row<any> }) => {
      const phoneNumber: string = row.getValue('phone') as string;
      return (
        <div className="flex items-center">
          <a
            href={`tel:${phoneNumber}`}
            className="text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300 flex items-center"
          >
            <FaPhone className="mr-2" />
            {phoneNumber}
          </a>
        </div>
      );
    },
    filterFn: (row: Row<any>, id: string, filterValue: any) => {
      const phoneNumber = row.getValue(id) as string;
      return phoneNumber.includes(filterValue);
    },
  },

  {
    accessorKey: '2FA',
    header: ({ column }: { column: ColumnDef<any> }) => (
      <DataTableColumnHeader column={column} title="2FA" />
    ),
    cell: ({ row }: { row: Row<any> }) => {
      const is2FAEnabled = row.getValue('2FA') as boolean;
      return (
        <div className="flex items-center">
          {is2FAEnabled ? "Enabled" : "Disabled"}
        </div>
      );
    },
  },

  {
    accessorKey: 'callRecording',
    header: ({ column }: { column: ColumnDef<any> }) => (
      <DataTableColumnHeader column={column} title="Call Recording" />
    ),
    cell: ({ row }: { row: Row<any> }) => {
      const isCallRecordingEnabled = row.getValue('callRecording') as boolean;
      return (
        <div className="flex items-center">
          {isCallRecordingEnabled ? "Enabled" : "Disabled"}
        </div>
      );
    },
  },

  {
    accessorKey: 'sendAs',
    header: ({ column }: { column: ColumnDef<any> }) => (
      <DataTableColumnHeader column={column} title="Send As" />
    ),
    cell: ({ row }: { row: Row<any> }) => {
      const sendAs = row.getValue('sendAs') as string;
      return (
        <div className="flex items-center">
          {sendAs}
        </div>
      );
    },
  },

  {
    id: 'actions',
    header: ({ column }: { column: ColumnDef<any> }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }: { row: Row<any> }) => <DataTableRowActions row={row} />,
  },
];

