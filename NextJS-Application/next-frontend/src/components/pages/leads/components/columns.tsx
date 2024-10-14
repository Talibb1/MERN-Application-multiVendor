import { useRouter } from 'next/navigation';
import { ColumnDef, Row } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { Checkbox } from '@/components/ui/checkbox';

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
  
  ...dynamicColumns.map(({ key, label, width, filter }) => ({
  accessorKey: key,
  header: ({ column }: { column: ColumnDef<any> }) => (
    <DataTableColumnHeader column={column} title={label} />
  ),
  cell: ({ row }: { row: Row<any> }) => {
    const router = useRouter();
    const value = row.getValue(key);

    const handleClick = () => {
      const leadId = row.original.id; 
      router.push(`/dashboard/Leads/${leadId}`);
    };

    if (key === 'contacts') {
      const contacts = row.original.contacts as { contactName: string }[];
      const firstContact = contacts.length > 0 ? contacts[0].contactName : 'No contacts';

      return (
        <div onClick={handleClick} className="cursor-pointer">
          {firstContact}
          {contacts.length > 1 && <span> ...more</span>}
        </div>
      );
    }

    return (
      <div
        style={{ width }}
        onClick={handleClick}
        className="cursor-pointer"
      >
        {value as string}
      </div>
    );
  },
  filterFn: filter
    ? (row: Row<any>, id: string, filterValue: any) => {
        const cellValue = row.getValue(id) as string;
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      }
    : undefined,
  enableSorting: true,
  enableHiding: true,
})),

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
    id: 'actions',
    header: ({ column }: { column: ColumnDef<any> }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }: { row: Row<any> }) => <DataTableRowActions row={row} />,
  },
];
