import { TypingDataType } from "./TypingDataType";

export interface TypingGameData {
  typingdata: TypingDataType;
  setTypingData: (a: TypingDataType) => void;
  typingdatas: TypingDataType[];
  setTypingDatas: (a: TypingDataType[]) => void;
  loading: boolean;
  error: Error | string | null;
}
