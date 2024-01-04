import { RefObject } from "react";
import { SHOW_RADIO } from "./SettingTypes";

export interface ModeProblemsProps {
  refs: RefObject<HTMLParagraphElement>[];
  kanaText: string;
  showFurigana: SHOW_RADIO;
  romajiText: string;
  questionText: string;
}
