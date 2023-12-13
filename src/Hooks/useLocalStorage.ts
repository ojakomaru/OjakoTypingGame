import React, { useCallback, useEffect, useRef, useState } from "react";

type UseLocalStorageParams<T> = {
  storageKey: string;
  initialState: T;
};

export function useLocalStorage<T>({
  storageKey,
  initialState
}: UseLocalStorageParams<T>): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, _setState] = useState(initialState);

  const setValueFromStorage = useCallback(() => {
    const storageValue = window.localStorage.getItem(storageKey);
    if (storageValue === null) return;
    const parsed = JSON.parse(storageValue);
    if (parsed === null || parsed === undefined) return;
    _setState(parsed.__value);
  }, [storageKey]);

  useEffect(() => {
    window.addEventListener("storage", setValueFromStorage);
    return () => window.removeEventListener("storage", setValueFromStorage);
  }, [setValueFromStorage]);

  const setState: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (value) => {
      _setState((prevState) => {
        const nextState: T = value instanceof Function ? value(prevState) : value;
        window.localStorage.setItem(
          storageKey,
          JSON.stringify({ __value: nextState })
        );

        return nextState;
      });
    },
    [storageKey]
  );

  return [state, setState];
}
