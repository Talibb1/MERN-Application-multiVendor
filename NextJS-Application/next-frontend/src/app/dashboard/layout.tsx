"use client";

import Sidebar from "@/components/pages/sidebar";
import DarkModeToggle from "@/components/layouts/DarkMoode";
import { UserNav } from "@/components/custom/user-nav";
import { Search } from "@/components/custom/search";
import { Suspense, useState } from "react";
import DarkModeLoader from "@/components/layouts/loader/DarkModeLoader";
import SearchLoader from "@/components/layouts/loader/SearchLoader";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <>
      <div className="flex h-screen">
        <Suspense>
          <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        </Suspense>

        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isCollapsed ? "ml-14" : "ml-64"
          }`}
        >
          <header className="z-10 flex h-[var(--header-height)] items-center gap-4 bg-background p-4 sticky top-0 shadow-md md:px-8">
            <Suspense fallback={<SearchLoader />}>
              <Search />
            </Suspense>

            <div className="ml-auto flex items-center space-x-4">
              <Suspense fallback={<DarkModeLoader />}>
                <DarkModeToggle />
              </Suspense>
              <Suspense fallback={<DarkModeLoader />}>
                <UserNav />
              </Suspense>
            </div>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </>
  );
}
