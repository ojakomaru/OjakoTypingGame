import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowEvent } from "../../../../../Hooks";

export const useEscapeWithHome = (setIsPlaying: (a: boolean) => void) => {
  const navigate = useNavigate();
  const handler = useCallback(
    (e: KeyboardEvent) => {
      // "Escape"キーでPlay画面を抜ける
      if (e.key === "Escape") {
        setIsPlaying(false);
        navigate("/");
      }
    },
    [setIsPlaying, navigate]
  );
  useWindowEvent("keydown", handler);
};
