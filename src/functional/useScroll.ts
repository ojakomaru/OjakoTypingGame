import { RefObject, useCallback, useRef } from "react";

export const useScroll = (): [RefObject<HTMLDivElement>, () => void] => {
  const ref = useRef<HTMLDivElement>(null);
  const moveTo = useCallback(() => {
    ref?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);
  return [ref, moveTo];
};
