import { RefObject, useCallback, useRef } from "react";

/**
 * スムーススクロールを設定する
 * @returns ref: ターゲットとなるDOMに渡す参照オブジェクト
 *          moveTo: ターゲットに移動する為のハンドルイベント
 */
export const useScroll = (): [RefObject<HTMLDivElement>, () => void] => {
  const ref = useRef<HTMLDivElement>(null);
  const moveTo = useCallback(() => {
    ref?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);
  return [ref, moveTo];
};
