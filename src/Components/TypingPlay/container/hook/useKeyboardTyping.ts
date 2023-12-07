import React, { useCallback, useRef } from "react";
import { keyMap } from "../../../../Config/stringMap";
type keyType = keyof typeof keyMap;
const useKeyboardTyping = () => {
  const keyboardRef = useRef<HTMLDivElement>(null);
  const keyboardInit = useCallback(() => {
    return {
      selActive: (key: keyType): void => {
        console.log(keyboardRef.current);
        if (!!keyboardRef.current) {
          const prevActive = Array.from(keyboardRef.current.children).filter(
            (el) => el.classList.contains(".active")
          );
          if (!!prevActive) {
            prevActive.forEach((el) => el.classList.remove("active"));
          }
          const selector = ".key_" + keyConvert(key.toLowerCase() as keyType);
          const target = Array.from(keyboardRef.current.children).filter((el) =>
            el.classList.contains(selector)
          );
          target.forEach((el) => el.classList.add("active"));
        }
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
