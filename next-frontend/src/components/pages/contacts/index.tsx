"use client";

import { Suspense, useEffect } from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { useContacts } from "@/lib/hooks/api";
import TableLoder from "@/components/layouts/loader/TableLoder";

export default function ContactsTables() {
  const { data, error, isLoading, isFetching } = useContacts();

  useEffect(() => {}, [data, error, isFetching]);

  if (error) {
    if (error && "data" in error) {
      const errorMessage = (error as any)?.data?.message || "Unknown error";
      return <p>Error fetching data: {errorMessage}</p>;
    }
    if ("message" in error) {
      return <p>Error: {(error as any).message}</p>;
    }
    return <p>An unknown error occurred.</p>;
  }

  const contacts = data?.data || [];

  return (
    <Suspense>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 px-4 py-6 md:px-8">
          <div className="mb-2 flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back!
              </h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your contacts for this month!
              </p>
            </div>
          </div>

          {/* ===== Data Table ===== */}
          <div className="flex-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            {isLoading || isFetching ? (
              <TableLoder />
            ) : (
              <DataTable data={contacts} columns={columns} />
            )}
          </div>
        </main>
      </div>
    </Suspense>
  );
}
