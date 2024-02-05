import { useCallback, useRef } from 'react';

const useKanaTypedMove = () => {
  const kanaRef = useRef<HTMLParagraphElement>(null);

  const kanaInit = useCallback(() => {
    let inputText: HTMLCollection;
    if (kanaRef.current) {
      inputText = kanaRef.current.children;
      return {
        // 正解時現在の文字を入力済みとする
        success: (position: number) => {
          inputText[position].classList.add('typed-letters');
          inputText[position].classList.remove('current-letter');
        },
        // 次の位置へ移動
        next: (position: number) => (inputText[position + 1].classList.add('current-letter')),
        // 初期の状態に戻す
        reset: () => {
          Array.from(inputText).forEach((char) => {
            char.classList.remove('typed-letters');
            char.classList.remove('typo');
          });
        },
        // 打ち間違えた文字であることを示すclassを追加
        miss: (position: number) => inputText[position].classList.add('typo'),
      };
    }
    return null;
  }, [kanaRef]);

  return { kanaRef, kanaInit };
};

export default useKanaTypedMove;
