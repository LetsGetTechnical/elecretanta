// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { useState, useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';

/**
 * Custom useLocalStorage hook.
 * @template T - Type of the value being stored.
 * @param key {string} - The localStorage key.
 * @param initialValue {T} - The initial value to set if none is found in localStorage.
 * @returns {[T, Dispatch<SetStateAction<T>>]} - The current value and a function to set the value
 */
const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
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

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      throw new Error(`Failed to set local storage item : ${error}`);
    }
  }, [key, storedValue, isServer]);

  return [storedValue, setStoredValue] as const;
};

export default useLocalStorage;
