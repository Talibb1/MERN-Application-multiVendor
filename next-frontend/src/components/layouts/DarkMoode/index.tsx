"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaDesktop } from "react-icons/fa";
import { MdOutlineLightMode } from "react-icons/md";

const DarkModeToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("theme") as "light" | "dark" | "system") || "light";
    setTheme(savedTheme);

    if (savedTheme === "system") {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      document.documentElement.classList.toggle(
        "dark",
        darkModeMediaQuery.matches
      );
    } else {
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const handleThemeChange = (selectedTheme: "light" | "dark" | "system") => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    if (selectedTheme === "system") {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      document.documentElement.classList.toggle(
        "dark",
        darkModeMediaQuery.matches
      );
    } else if (selectedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (theme === "system") {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      const isNightTime =
        new Date().getHours() >= 18 || new Date().getHours() < 6;
      document.documentElement.classList.toggle(
        "dark",
        darkModeMediaQuery.matches || isNightTime
      );
    }
  }, [theme]);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      >
        {theme === "dark" ? (
          <FaMoon className="text-gray-300 dark:text-gray-200" />
        ) : theme === "light" ? (
          <MdOutlineLightMode className="text-gray-900 dark:text-gray-200" />
        ) : (
          <FaDesktop className="text-gray-600 dark:text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-600">
          <button
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left transition-colors"
            onClick={() => handleThemeChange("light")}
          >
            <MdOutlineLightMode className="mr-2 text-gray-900 dark:text-gray-100" />{" "}
            Light Mode
          </button>
          <button
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left transition-colors"
            onClick={() => handleThemeChange("dark")}
          >
            <FaMoon className="mr-2 text-gray-300 dark:text-gray-200" /> Dark
            Mode
          </button>
          <button
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left transition-colors"
            onClick={() => handleThemeChange("system")}
          >
            <FaDesktop className="mr-2 text-gray-600 dark:text-gray-400" />{" "}
            System
          </button>
        </div>
      )}
    </div>
  );
};

export default DarkModeToggle;
