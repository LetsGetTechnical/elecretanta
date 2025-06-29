// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { useState, useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';

type LocalStorageReturnType<T> = [
  T,
  Dispatch<SetStateAction<T>>,
  string | null,
];

/**
 * Custom useLocalStorage hook.
 * @template T - Type of the value being stored.
 * @param key {string} - The localStorage key.
 * @param initialValue {T} - The initial value to set if none is found in localStorage.
 * @returns {LocalStorageReturnType<T>} - The current value, the function to set the value, and possible error message.
 */
const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): LocalStorageReturnType<T> => {
  const isServer = typeof window === 'undefined';

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (isServer) {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item === null ? initialValue : JSON.parse(item);
    } catch {
      return initialValue;
    }
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
      setError(null);
    } catch {
      setError('Failed to set item in local storage.');
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue, error] as const;
};

export default useLocalStorage;
