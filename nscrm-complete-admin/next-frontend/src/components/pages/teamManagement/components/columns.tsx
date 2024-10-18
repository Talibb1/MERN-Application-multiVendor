import { ColumnDef, Row } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

// Custom filter function for case-insensitive search
const globalFilter = (row: any, columnId: string, filterValue: string) => {
  const value = row.getValue(columnId);
  return value?.toLowerCase().includes(filterValue.toLowerCase());
};

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

  // User Column: Display image, name, and email
  {
    accessorKey: 'user',
    header: ({ column }: { column: ColumnDef<any> }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }: { row: Row<any> }) => {
      const user = row.original.user as { avatar: string | null; firstName: string; lastName: string; email: string };

      const defaultImage = '/avatar_12.jpg'; 

      return (
        <div className="flex items-center">
          <Image
            src={user.avatar || defaultImage}
            alt={user.firstName}
            width={40}
            height={40}
            className="rounded-full mr-2"
          />
          <div>
            <div className="font-bold">{user.firstName} {user.lastName}</div>
            <div className="text-muted-foreground">{user.email}</div>
          </div>
        </div>
      );
    },
    filterFn: globalFilter,  // Enable search on the 'user' column
  },

  // Organization Column
  {
    accessorKey: 'organization',
    header: ({ column }: { column: ColumnDef<any> }) => (
      <DataTableColumnHeader column={column} title="Organization" />
    ),
    cell: ({ row }: { row: Row<any> }) => {
      const organization = row.original.organization;
      return (
        <div>{organization?.name || 'No Organization'}</div>
      );
    },
    filterFn: globalFilter,  // Enable search on the 'organization' column
  },

  // Role Column
  {
    accessorKey: 'role',
    header: ({ column }: { column: ColumnDef<any> }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }: { row: Row<any> }) => {
      const role = row.getValue('role') as string;
      return (
        <div>{role}</div>
      );
    },
    filterFn: globalFilter,  // Enable search on the 'role' column
  },

  // 2FA Column
  {
    accessorKey: '2FA',
    header: ({ column }: { column: ColumnDef<any> }) => (
      <DataTableColumnHeader column={column} title="2FA" />
    ),
    cell: ({ row }: { row: Row<any> }) => {
      const is2FAEnabled = row.getValue('2FA') as boolean;
      return (
        <div>{is2FAEnabled ? 'Enabled' : 'Disabled'}</div>
      );
    },
    filterFn: globalFilter,  // Enable search on the '2FA' column
  },

  // Call Recording Column
  {
    accessorKey: 'callRecording',
    header: ({ column }: { column: ColumnDef<any> }) => (
      <DataTableColumnHeader column={column} title="Call Recording" />
    ),
    cell: ({ row }: { row: Row<any> }) => {
      const isCallRecordingEnabled = row.getValue('callRecording') as boolean;
      return (
        <div>{isCallRecordingEnabled ? 'Enabled' : 'Disabled'}</div>
      );
    },
    filterFn: globalFilter,  // Enable search on the 'callRecording' column
  },

  {
    id: 'actions',
    header: ({ column }: { column: ColumnDef<any> }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }: { row: Row<any> }) => <DataTableRowActions row={row} />,
  },
];
