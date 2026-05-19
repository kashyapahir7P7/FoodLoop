import { useState, useCallback } from 'react';

/**
 * usePasswordToggle Hook
 * Manages password visibility state for multiple fields
 * 
 * @returns {Object} Password visibility state and toggle handler
 */
export function usePasswordToggle() {
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const togglePasswordVisibility = useCallback((fieldName) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  }, []);

  const isPasswordVisible = useCallback((fieldName) => {
    return visiblePasswords[fieldName] || false;
  }, [visiblePasswords]);

  return {
    visiblePasswords,
    togglePasswordVisibility,
    isPasswordVisible,
  };
}
