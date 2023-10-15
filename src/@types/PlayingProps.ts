import { TypingDataType } from "./TypingDataType";

export interface PlayingProps {
  typingdata: TypingDataType;
  setTypingData: (a: TypingDataType) => void;
  typingdatas: TypingDataType[];
  setTypingDatas: (a: TypingDataType[]) => void;
  // setting: {
  //   isROMAZI: boolean;
  //   isKANA: boolean;
  //   isKeyGuide: boolean;
  //   isShowWPM: boolean;
  //   isSpeedBer: boolean;
  // };
  // score: number;
  // setScore: (a: number) => void;
}