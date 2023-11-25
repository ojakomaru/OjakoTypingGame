import { useEffect, useRef } from "react";


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