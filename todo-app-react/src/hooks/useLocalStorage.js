import { useState, useEffect } from 'react';

/**
 * Custom hook to sync any React state with localStorage.
 * @param {string} key - The localStorage key to use.
 * @param {*} initialValue - The default value to use if nothing is in localStorage.
 */
export function useLocalStorage(key, initialValue) {
  // Load initial value from localStorage or fallback to initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading ${key} from localStorage`, error);
      return initialValue;
    }
  });

  // Save value to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error saving ${key} to localStorage`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
