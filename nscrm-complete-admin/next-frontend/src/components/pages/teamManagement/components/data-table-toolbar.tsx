import { useState, useEffect } from 'react';
import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/ui/input';
import { DataTableViewOptions } from './data-table-view-options';
import { CreateTeamMembers } from './CRUD-Actions/createleads';
import { debounce } from 'lodash';
import { PuffLoader } from 'react-spinners';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = debounce((value: string) => {
    setSearchTerm(value);
  }, 300);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      table.setGlobalFilter(searchTerm);
      setIsLoading(false);
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <div className="relative flex items-center">
          <Input
            placeholder="Filter tasks..."
            onChange={(event) => handleSearchChange(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {isLoading && (
            <PuffLoader
              size={24}  
              color="#4A90E2"
              className="ml-2" 
            />
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <CreateTeamMembers />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
