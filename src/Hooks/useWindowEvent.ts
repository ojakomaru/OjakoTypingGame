import { DependencyList, useEffect } from "react";

/**
 * JSのaddEventListenerのラッパーフック
 * @param type イベントのタイプを文字列で指定
 * @param listener 実行するイベントハンドラ
 * @param deps 実行依存ステートの配列 空でも可
 * @param options EventListenerと同様
 * @returns listenerに渡したコールバックの結果が返る
 */
export const useWindowEvent = <K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  deps?: DependencyList,
  options?: boolean | AddEventListenerOptions
) =>
  useEffect(() => {
    if (window) {
      window.addEventListener(type, listener, options);
      return () => {
        window.removeEventListener(type, listener, options);
      };
    }
  }, deps);
