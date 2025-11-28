import { useState, useEffect } from 'react';

/**
 * Custom hook for localStorage with automatic persistence
 * @param {string} key - localStorage key
 * @param {*} defaultValue - default value if key doesn't exist
 * @returns {[value, setValue]} - [current value, setter function]
 */
export function useLocalStorage(key, defaultValue) {
  // Initialize state with value from localStorage or default
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error loading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  // Update localStorage when value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
