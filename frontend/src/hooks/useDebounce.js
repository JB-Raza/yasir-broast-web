import { useState, useEffect } from 'react';

/**
 * Debounce a value by a given delay (default 300 ms).
 * The returned value only updates after the input has been
 * stable for `delay` milliseconds.
 *
 * @template T
 * @param {T}      value - The value to debounce
 * @param {number} delay - Debounce delay in ms
 * @returns {T} Debounced value
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
