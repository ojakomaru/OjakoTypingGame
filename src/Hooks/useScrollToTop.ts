import { useCallback } from "react"

/**
 * 実行すると画面トップに戻る
 * @return なし
 */
export const useScrollToTop = (): () => void => {
  const moveTop = useCallback(() => {
    window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
  },[]);
  return moveTop;
}