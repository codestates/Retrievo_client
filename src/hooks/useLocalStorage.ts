import React, { useState, useEffect } from "react";

function getSavedValue<T>(key: string, initialValue: T) {
  const savedValue = JSON.parse(localStorage.getItem(key) || "{}");

  if (savedValue) return savedValue;

  if (initialValue instanceof Function) return initialValue();
  return initialValue;
}

export default function useLocalStorage(
  key: string,
  initialValue: unknown
): [string, React.Dispatch<string>] {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
