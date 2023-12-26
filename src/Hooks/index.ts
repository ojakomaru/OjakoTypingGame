import Romanizer from "./Romanizer";
import useEffectOnce from "./useEffectOnce";
import usePrevious from "./usePrevious";
import { useScroll } from "./useScroll";
import { useScrollToTop } from "./useScrollToTop";
import { useWindowEvent } from "./useWindowEvent";
import randomArray from "./randomArray";
import { showConfirmDialog } from "./showConfirmDialog";
import { useLocalStorage } from "./useLocalStorage";
import { timeFormatting, wpmToComment, wpmToRank } from "./scoreCalc";

export {
  timeFormatting,
  wpmToComment,
  wpmToRank,
  Romanizer,
  randomArray,
  showConfirmDialog,
  useLocalStorage,
  useEffectOnce,
  usePrevious,
  useScroll,
  useScrollToTop,
  useWindowEvent,
};
