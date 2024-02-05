import { useCallback, useRef } from 'react';

const useRomajiTypedMove = () => {
  const romajiRef = useRef<HTMLParagraphElement>(null);
  const romajiInit = useCallback(() => {
    let inputText: HTMLCollection;
    if (romajiRef.current) {
      inputText = romajiRef.current.children;
      return {
        // 正解時現在の文字を入力済みとする
        success: (position: number) => {
          inputText[position].classList.add('typed-letters');
          inputText[position].classList.remove('current-letter');
        },
        // 次の位置へ移動
        next: (position: number) => inputText[position + 1].classList.add('current-letter'),
        // 初期の状態に戻す
        reset: () => {
          inputText[0].classList.add('current-letter');
          Array.from(inputText).forEach((char) => {
            char.classList.remove('typed-letters');
            char.classList.remove('typo');
            char.classList.add('waiting-letters');
          });
        },
        refresh: (position: number) => {
          for (let i = 0; i < position; i++) {
            inputText[i].classList.remove('current-letter');
            inputText[i].classList.add('typed-letters');
          }
          inputText[position].classList.add('current-letter');
        },
        // 打ち間違えた文字であることを示すclassを追加
        miss: (position: number) => inputText[position].classList.add('typo'),
      };
    }
    return null;
  }, [romajiRef]);

  return { romajiRef, romajiInit };
};

export default useRomajiTypedMove;
