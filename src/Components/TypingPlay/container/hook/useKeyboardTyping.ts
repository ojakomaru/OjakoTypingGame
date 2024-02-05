import { useCallback, useRef } from 'react';
import { keyMap } from '../../../../Config/stringMap';

type KeyType = keyof typeof keyMap;
const useKeyboardTyping = () => {
  const keyboardRef = useRef<HTMLDivElement>(null);

  // 対応キーの変換
  function keyConvert(key: KeyType): string {
    if (key in keyMap) {
      return keyMap[key];
    }
    return key;
  }

  const keyboardInit = useCallback(
    () => ({
      selActive: (key: KeyType): void => {
        if (keyboardRef.current) {
          let selector: string = '';
          let target: Element[];
          // 現在のキーをすべて削除
          const prevActive = Array.from(keyboardRef.current.children).filter((el) => el.classList.contains('active'));
          if (prevActive.length > 0) {
            prevActive.forEach((el) => el.classList.remove('active'));
          }
          // キーが記号ではない場合
          if (!key.match(/[ -/:-@[-`/{-~]/)) {
            selector = `key_${keyConvert(key.toLowerCase() as KeyType)}`;
            target = Array.from(keyboardRef.current.children).filter((el) => el.classList.contains(selector));
          } else {
            selector = `key_${keyConvert(key as KeyType)}`;
            target = Array.from(keyboardRef.current.children).filter((el) => el.classList.contains(selector));
            // 左シフトキーが必要な場合
            if (key.match(/[:”<>^&*(){}?]/)) {
              target.push(
                ...Array.from(keyboardRef.current.children).filter((el) => el.classList.contains('key_lShift'))
              );
            }
            // 右シフトキーが必要な場合
            else if (key.match(/[~!@#%]/)) {
              target.push(
                ...Array.from(keyboardRef.current.children).filter((el) => el.classList.contains('key_rShift'))
              );
            }
          }
          target.forEach((el) => el.classList.add('active'));
        }
      },
    }),
    []
  );

  return { keyboardRef, keyboardInit };
};

export default useKeyboardTyping;
