import { DependencyList, useCallback } from "react";
import { useWindowEvent } from "../../../Hooks/useWindowEvent";

/**
 * useStartGame
 * @param setIsPlaying ゲーム実行中フラグを切り替える為のステート関数
 * @param deps 実行依存ステートの配列 空でも可
 */
export const useStartGame = (
  setIsPlaying: (a: boolean) => void,
  deps: DependencyList
) => {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsPlaying!(true);
      }
    },
    [deps]
  );
  useWindowEvent("keydown", handler, deps);
};
