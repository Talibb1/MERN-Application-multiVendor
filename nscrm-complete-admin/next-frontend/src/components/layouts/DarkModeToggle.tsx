"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun, FaDesktop } from "react-icons/fa";

const DarkModeToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'light';
    setTheme(savedTheme);

    if (savedTheme === 'system') {
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      document.documentElement.classList.toggle('dark', darkModeMediaQuery.matches);
    } else {
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const handleThemeChange = (selectedTheme: 'light' | 'dark' | 'system') => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    if (selectedTheme === 'system') {
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      document.documentElement.classList.toggle('dark', darkModeMediaQuery.matches);
    } else if (selectedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (theme === 'system') {
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const isNightTime = new Date().getHours() >= 18 || new Date().getHours() < 6;
      document.documentElement.classList.toggle('dark', darkModeMediaQuery.matches || isNightTime);
    }
  }, [theme]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center p-2 bg-gray-200 rounded hover:bg-gray-300">
        {theme === 'dark' ? <FaMoon /> : theme === 'light' ? <FaSun /> : <FaDesktop />}
      </button>
      {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
          <button
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
            onClick={() => handleThemeChange('light')}
          >
            <FaSun className="mr-2" /> Light Mode
          </button>
          <button
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
            onClick={() => handleThemeChange('dark')}
          >
            <FaMoon className="mr-2" /> Dark Mode
          </button>
          <button
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
            onClick={() => handleThemeChange('system')}
          >
            <FaDesktop className="mr-2" /> System
          </button>
        </div>
      )}
    </div>
  );
};

export default DarkModeToggle;
