import { useEffect, useState } from "react";

export const useDebounce = <T>(
  value: T,
  delay = 300,
  callback?: () => void
): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
        if (callback) {
          callback();
        }
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, delay]
  );
  return debouncedValue;
};
