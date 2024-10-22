"use client";

import { useEffect, useState } from "react";
import { IconChevronsLeft, IconMenu2, IconX } from "@tabler/icons-react";
import { Layout } from "@/components/custom/layout";
import { Button } from "@/components/custom/button";
import Nav from "@/components/custom/nav";
import { cn } from "@/lib/utils";
import { sidelinks } from "@/components/pages/sidebar/sidelinks";

export default function Sidebar({
  className,
  isCollapsed,
  toggleSidebar,
}: {
  className?: string;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}) {
  const [navOpened, setNavOpened] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setNavOpened(window.innerWidth < 768 ? false : navOpened);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [navOpened]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (navOpened) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    }
  }, [navOpened]);

  return (
    <aside
      className={cn(
        `fixed left-0 top-0 z-50 h-screen border-r-2 border-r-muted transition-all duration-300 ${
          isCollapsed ? "w-14" : "w-64"
        }`,
        className
      )}
    >
      <Layout fixed className={navOpened ? "h-screen" : ""}>
        <Layout.Header
          sticky
          className="z-50 flex justify-between px-4 py-3 shadow-sm"
        >
          <div className={`flex items-center ${!isCollapsed ? "gap-2" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className={`transition-all ${isCollapsed ? "h-6 w-6" : "h-8 w-8"}`}
            >
              <rect width="256" height="256" fill="none"></rect>
              <span className="sr-only">Website Name</span>
            </svg>
            <div
              className={`flex flex-col justify-end truncate ${
                isCollapsed ? "invisible w-0" : "visible w-auto"
              }`}
            >
              <span className="font-medium">Dashboard</span>
              <span className="text-xs">Admin</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle Navigation"
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </Layout.Header>
        <Nav
          className={`z-40 h-full flex-1 overflow-auto ${
            navOpened ? "max-h-screen" : "max-h-0 py-0 md:max-h-screen md:py-2"
          }`}
          isCollapsed={isCollapsed}
          links={sidelinks}
        />
        <Button
          onClick={toggleSidebar}
          size="icon"
          variant="outline"
          className="absolute top-4 right-[-25px] z-50 rounded-full md:inline-flex"
        >
          <IconChevronsLeft
            stroke={1.5}
            className={`h-5 w-5 ${isCollapsed ? "rotate-180" : ""}`}
          />
        </Button>
      </Layout>
    </aside>
  );
}
