import React, { useCallback, useEffect, useState } from "react";

type UseLocalStorageParams<T> = {
  storageKey: string;
  initialState: T;
};

export function useLocalStorage<T>({
  storageKey,
  initialState,
}: UseLocalStorageParams<T>): [T, React.Dispatch<React.SetStateAction<T>>] {
  const setValueFromStorage = useCallback(() => {
    const storageValue = window.localStorage.getItem(storageKey);
    if (storageValue === null) return initialState;
    const parsed = JSON.parse(storageValue);
    if (parsed === null || parsed === undefined) return initialState;
    return parsed;
  }, [storageKey]);
  const [state, _setState] = useState(setValueFromStorage());

  useEffect(() => {
    window.addEventListener("storage", setValueFromStorage);
    return () => window.removeEventListener("storage", setValueFromStorage);
  }, [setValueFromStorage]);

  const setState: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (value) => {
      _setState((prevState: T) => {
        const nextState: T =
          value instanceof Function ? value(prevState) : value;
        window.localStorage.setItem(storageKey, JSON.stringify(nextState));
        return nextState;
      });
    },
    [storageKey]
  );

  return [state, setState];
}
