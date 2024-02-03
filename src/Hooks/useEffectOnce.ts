import { useEffect, useRef } from "react";

/**
 * useEffectのラッパー関数で一度だけ実行したい関数に使用します
 * @param effect useEffectの関数
 */
const useEffectOnce = (effect: React.EffectCallback) => {
  const called = useRef(false);

  useEffect(() => {
    if (!called.current) {
      called.current = true;
      return effect();
    }
  }, []);
};
export default useEffectOnce;