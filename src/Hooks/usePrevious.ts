import { useRef, useEffect } from "react";

const usePrevious = <T extends unknown>(value: T) => {
  const ref = useRef<T>();
  const prev = ref.current;
  useEffect(() => {
    ref.current = value;
  });
  return {ref, prev};
};
export default usePrevious;
