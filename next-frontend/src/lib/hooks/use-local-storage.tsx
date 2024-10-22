"use client";

import { useEffect, useState } from "react";

function useLocalStorage(key: string, defaultValue: boolean) {
  const [storedValue, setStoredValue] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.error("Error accessing local storage", error);
        return defaultValue;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error("Error saving to local storage", error);
      }
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
