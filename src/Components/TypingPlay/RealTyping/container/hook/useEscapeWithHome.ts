import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowEvent } from "../../../../../Hooks";

export const useEscapeWithHome = (setIsStandby: (a: boolean) => void) => {
  const navigate = useNavigate();
  const handler = useCallback(
    (e: KeyboardEvent) => {
      // "Escape"キーでPlay画面を抜ける
      if (e.key === "Escape") {
        setIsStandby(true);
        navigate("/home");
      }
    },
    [setIsStandby, navigate]
  );
  useWindowEvent("keydown", handler);
};
