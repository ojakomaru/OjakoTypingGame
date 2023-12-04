import React, { useCallback, useRef } from "react";
import { keyMap } from "../../../../Config/stringMap";
type keyType = keyof typeof keyMap;
const useKeyboardTyping = () => {
  const keyboardRef = useRef<HTMLDivElement>(null);
  const keyboardInit = useCallback(() => {
    return {
      selActive: (key: keyType): void => {
        const prevActive = keyboardRef.current!.querySelector(".active");
        const selector = ".key_" + keyConvert(key);
        const target = keyboardRef.current!.querySelector(selector);
        if (prevActive) {
          prevActive.classList.remove("active");
        }
        target!.classList.add("active");
      },
    };
  }, []);

  // 対応キーの変換
  function keyConvert(key: keyType): string {
    if (key in keyMap) {
      return keyMap[key];
    } else {
      return key;
    }
  }
  return { keyboardRef, keyboardInit };
};

export default useKeyboardTyping;
