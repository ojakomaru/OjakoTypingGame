import { useRef, useEffect } from "react";

/**
 * 監視したい変数を渡して前回の値と比較できるように保持します
 * @param value 監視したい変数
 * @returns ref: 監視したい変数の前回の値になります
 */
const usePrevious = <T extends unknown>(value: T) => {
  const ref = useRef<T>();
  const prev = ref.current;
  useEffect(() => {
    ref.current = value;
  });
  return {ref, prev};
};
export default usePrevious;
